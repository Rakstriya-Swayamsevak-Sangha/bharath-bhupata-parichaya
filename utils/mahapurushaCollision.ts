/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAHAPURUSHA SCREEN-SPACE RENDERING & HISTORICAL HUB GROUPING ENGINE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ARCHITECTURAL PRINCIPLES:
 * 1. Historical coordinates (LatLng) remain authoritative, locked, and unmutated.
 * 2. Grouping & collision resolution occurs purely in screen-space container coordinates.
 * 3. MAP'S UPPERCASE / CANONICAL SCRIPT IS LOCKED:
 *    - English names are ALWAYS rendered uppercase (e.g. CHANDRAGUPTA MAURYA).
 *    - Never title-case, lowercase, abbreviate, or truncate.
 *    - Kannada & Hindi names preserve their canonical scripts.
 *    - Information density is managed via VISIBILITY & GROUPING, not renaming.
 * 4. UNSELECTED GROUPS: Render Golden Flame + count badge; NO long labels.
 * 5. SELECTED GROUPS: Render Golden Flame + count badge + selected member's uppercase label.
 * 6. ISOLATED MARKERS: Render standard Golden Flame + uppercase label.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import L from 'leaflet';
import { MahapurushaAnchor } from '@/data/mahapurushasGeometry';

export interface CandidatePlacement {
  id: string;
  direction: 'bottom' | 'right' | 'left' | 'top';
  offset: [number, number];
}

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Zoom-dependent screen-space grouping thresholds (in container pixels).
 * Exact coordinate matches (screenDistance === 0) ALWAYS group at all zooms.
 */
export const MAHAPURUSHA_GROUP_THRESHOLDS = {
  overview: 38, // zoom <= 5
  medium: 24,   // zoom 6 - 8
  high: 12,     // zoom >= 9
} as const;

export function getMahapurushaGroupThreshold(zoom: number): number {
  if (zoom <= 5) return MAHAPURUSHA_GROUP_THRESHOLDS.overview;
  if (zoom <= 8) return MAHAPURUSHA_GROUP_THRESHOLDS.medium;
  return MAHAPURUSHA_GROUP_THRESHOLDS.high;
}

/**
 * Deterministic candidate placements in strictly preferred order.
 * Candidate 0 matches the exact existing Leaflet tooltip parameters: direction="bottom", offset=[0, 8].
 */
export const CANDIDATE_PLACEMENTS: CandidatePlacement[] = [
  { id: 'bottom-center', direction: 'bottom', offset: [0, 8] },
  { id: 'right',         direction: 'right',  offset: [16, -2] },
  { id: 'left',          direction: 'left',   offset: [-16, -2] },
  { id: 'top-center',    direction: 'top',    offset: [0, -10] },
  { id: 'bottom-right',  direction: 'right',  offset: [16, 16] },
  { id: 'bottom-left',   direction: 'left',   offset: [-16, 16] },
  { id: 'top-right',     direction: 'right',  offset: [16, -20] },
  { id: 'top-left',      direction: 'left',   offset: [-16, -20] },
  { id: 'bottom-tier2',  direction: 'bottom', offset: [0, 26] },
  { id: 'top-tier2',     direction: 'top',    offset: [0, -28] },
];

/**
 * Render group model for Mahapurushas at a given map view.
 */
export interface MahapurushaRenderGroup {
  groupId: string;
  coords: [number, number];
  members: MahapurushaAnchor[];
  count: number;
  isSelected: boolean;
  selectedMember: MahapurushaAnchor | null;
  activeMember: MahapurushaAnchor;
  showLabel: boolean;
  placement: CandidatePlacement;
}

const dimensionCache = new Map<string, { width: number; height: number }>();

export function clearLabelDimensionCache(): void {
  dimensionCache.clear();
}

/**
 * Measure rendered label dimensions using actual DOM typography context.
 * Uses a singleton ruler styled identically to .leaflet-tooltip.sacred-label.mahapurusha-label.
 */
export function getLabelDimensions(
  text: string,
  container?: HTMLElement | null
): { width: number; height: number } {
  if (!text) return { width: 60, height: 16 };

  const cacheKey = `${text}:${container?.clientWidth || 0}`;
  const cached = dimensionCache.get(cacheKey);
  if (cached) return cached;

  if (typeof document !== 'undefined') {
    let ruler = document.getElementById('mahapurusha-label-ruler');
    if (!ruler) {
      ruler = document.createElement('div');
      ruler.id = 'mahapurusha-label-ruler';
      ruler.className = 'leaflet-tooltip sacred-label mahapurusha-label';
      ruler.style.position = 'absolute';
      ruler.style.visibility = 'hidden';
      ruler.style.pointerEvents = 'none';
      ruler.style.zIndex = '-9999';
      ruler.style.left = '-9999px';
      ruler.style.top = '-9999px';
      ruler.style.whiteSpace = 'nowrap';
      ruler.style.opacity = '0';

      const parent = container || document.body;
      parent.appendChild(ruler);
    }

    ruler.textContent = text;
    const rect = ruler.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);

    if (width > 0 && height > 0) {
      const dim = { width, height };
      dimensionCache.set(cacheKey, dim);
      return dim;
    }
  }

  return {
    width: Math.max(50, text.length * 9),
    height: 16,
  };
}

export function computeLabelBox(
  cx: number,
  cy: number,
  width: number,
  height: number,
  candidate: CandidatePlacement
): Rect {
  let subX = 0;
  let subY = 0;

  if (candidate.direction === 'bottom') {
    subX = width / 2;
    subY = 0;
  } else if (candidate.direction === 'top') {
    subX = width / 2;
    subY = height;
  } else if (candidate.direction === 'right') {
    subX = 0;
    subY = height / 2;
  } else if (candidate.direction === 'left') {
    subX = width;
    subY = height / 2;
  }

  const left = cx - subX + candidate.offset[0];
  const top = cy - subY + candidate.offset[1];

  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}

export function boxesIntersect(a: Rect, b: Rect, padX = 4, padY = 2): boolean {
  return !(
    a.right + padX <= b.left ||
    a.left >= b.right + padX ||
    a.bottom + padY <= b.top ||
    a.top >= b.bottom + padY
  );
}

export function isBoxWithinBounds(box: Rect, containerWidth: number, containerHeight: number): boolean {
  return (
    box.left >= 0 &&
    box.right <= containerWidth &&
    box.top >= 0 &&
    box.bottom <= containerHeight
  );
}

/**
 * Generalized Screen-Space Grouping & Collision Engine.
 * 
 * 1. Clusters co-located (exact LatLng) and proximate Mahapurushas into MahapurushaRenderGroups.
 * 2. Unselected groups (count > 1) display NO long label (discovery state).
 * 3. Selected groups (count > 1) display the selected member's canonical uppercase label.
 * 4. Isolated markers (count === 1) display their canonical uppercase label with collision avoidance.
 */
export function computeMahapurushaRenderGroups(
  map: L.Map,
  items: MahapurushaAnchor[],
  lang: 'en' | 'kn' | 'hi',
  selectedId: string | null | undefined
): MahapurushaRenderGroup[] {
  if (!map || items.length === 0) return [];

  let container: HTMLElement | null = null;
  try {
    container = map.getContainer();
  } catch {
    // Map not ready
  }

  const containerW = container?.clientWidth || 800;
  const containerH = container?.clientHeight || 600;
  const currentZoom = map.getZoom();
  const threshold = getMahapurushaGroupThreshold(currentZoom);

  // Project all items into screen coordinates
  const projected: { person: MahapurushaAnchor; pt: L.Point }[] = [];
  for (const person of items) {
    try {
      const pt = map.latLngToContainerPoint(L.latLng(person.coords[0], person.coords[1]));
      projected.push({ person, pt });
    } catch {
      // Fallback
    }
  }

  // Step 1: Group items based on exact coordinate matching or screen distance <= threshold
  const clusters: { members: MahapurushaAnchor[]; centerPt: L.Point; coords: [number, number] }[] = [];
  const assigned = new Set<string>();

  for (let i = 0; i < projected.length; i++) {
    const p1 = projected[i];
    if (assigned.has(p1.person.id)) continue;

    const clusterMembers: MahapurushaAnchor[] = [p1.person];
    assigned.add(p1.person.id);

    for (let j = i + 1; j < projected.length; j++) {
      const p2 = projected[j];
      if (assigned.has(p2.person.id)) continue;

      // Exact coordinates ALWAYS group at all zoom levels
      const isExactMatch =
        Math.abs(p1.person.coords[0] - p2.person.coords[0]) < 0.0001 &&
        Math.abs(p1.person.coords[1] - p2.person.coords[1]) < 0.0001;

      const screenDist = Math.hypot(p1.pt.x - p2.pt.x, p1.pt.y - p2.pt.y);

      if (isExactMatch || screenDist <= threshold) {
        clusterMembers.push(p2.person);
        assigned.add(p2.person.id);
      }
    }

    clusters.push({
      members: clusterMembers,
      centerPt: p1.pt,
      coords: p1.person.coords,
    });
  }

  // Step 2: Build render groups and resolve deterministic placements
  const placedBoxes: { id: string; box: Rect; candidate: CandidatePlacement }[] = [];

  // Sort clusters deterministically: selected group first, then stable coordinate order
  clusters.sort((a, b) => {
    const aHasSelected = a.members.some(m => m.id === selectedId);
    const bHasSelected = b.members.some(m => m.id === selectedId);
    if (aHasSelected && !bHasSelected) return -1;
    if (!aHasSelected && bHasSelected) return 1;
    return a.members[0].id.localeCompare(b.members[0].id);
  });

  const renderGroups: MahapurushaRenderGroup[] = [];

  for (const cluster of clusters) {
    const count = cluster.members.length;
    const isSelected = cluster.members.some(m => m.id === selectedId);
    const selectedMember = isSelected
      ? cluster.members.find(m => m.id === selectedId) || null
      : null;
    const activeMember = selectedMember || cluster.members[0];
    const groupId = cluster.members.map(m => m.id).sort().join('-');

    // Label visibility rule:
    // - Count === 1 (isolated): ALWAYS shows label (subject to collision check)
    // - Count > 1 (group): Only shows label if a member is currently selected!
    const showLabel = count === 1 || isSelected;

    let chosenCandidate: CandidatePlacement = CANDIDATE_PLACEMENTS[0];

    if (showLabel) {
      const title = activeMember.name[lang] || activeMember.name.en;
      const { width, height } = getLabelDimensions(title, container);
      let found = false;

      // Pass 1: candidate that doesn't collide with placed boxes AND stays within viewport
      for (const candidate of CANDIDATE_PLACEMENTS) {
        const box = computeLabelBox(cluster.centerPt.x, cluster.centerPt.y, width, height, candidate);
        const collides = placedBoxes.some(p => boxesIntersect(box, p.box));
        if (!collides && isBoxWithinBounds(box, containerW, containerH)) {
          chosenCandidate = candidate;
          placedBoxes.push({ id: groupId, box, candidate });
          found = true;
          break;
        }
      }

      // Pass 2: candidate that doesn't collide regardless of viewport edge
      if (!found) {
        for (const candidate of CANDIDATE_PLACEMENTS) {
          const box = computeLabelBox(cluster.centerPt.x, cluster.centerPt.y, width, height, candidate);
          const collides = placedBoxes.some(p => boxesIntersect(box, p.box));
          if (!collides) {
            chosenCandidate = candidate;
            placedBoxes.push({ id: groupId, box, candidate });
            found = true;
            break;
          }
        }
      }

      // Pass 3: least intrusive fallback
      if (!found) {
        chosenCandidate = CANDIDATE_PLACEMENTS[0];
        const box = computeLabelBox(cluster.centerPt.x, cluster.centerPt.y, width, height, chosenCandidate);
        placedBoxes.push({ id: groupId, box, candidate: chosenCandidate });
      }
    }

    renderGroups.push({
      groupId,
      coords: cluster.coords,
      members: cluster.members,
      count,
      isSelected,
      selectedMember,
      activeMember,
      showLabel,
      placement: chosenCandidate,
    });
  }

  return renderGroups;
}
