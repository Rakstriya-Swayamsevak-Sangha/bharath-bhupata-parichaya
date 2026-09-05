/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAHAPURUSHA LABEL COLLISION MANAGER — Screen-Space Generalized Rendering Engine
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ARCHITECTURAL PRINCIPLE:
 * Historical Data (LatLng) is locked and authoritative.
 * Collision resolution occurs purely in screen-space container pixel coordinates.
 * No hardcoded person IDs, no coordinate jitter, no artificial displacement.
 * 
 * CANDIDATE ORDER:
 * 1. bottom-center (default)
 * 2. right
 * 3. left
 * 4. top-center
 * 5. bottom-right
 * 6. bottom-left
 * 7. top-right
 * 8. top-left
 * 
 * DETERMINISTIC PRIORITY:
 * 1. Currently selected Mahapurusha
 * 2. Stable data order in mahapurushasGeometry
 * 3. Deterministic ID tie-breaker
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
  // Extended fallback tiers for pathological co-locations (9+ figures)
  { id: 'bottom-tier2',  direction: 'bottom', offset: [0, 26] },
  { id: 'top-tier2',     direction: 'top',    offset: [0, -28] },
];

/**
 * Memoized dimension cache.
 * Keyed by text and container width to account for responsive styling context.
 */
const dimensionCache = new Map<string, { width: number; height: number }>();

/**
 * Clear dimension cache (useful on window resize or breakpoint changes).
 */
export function clearLabelDimensionCache(): void {
  dimensionCache.clear();
}

/**
 * Measure rendered label dimensions using actual DOM typography context.
 * Uses a singleton ruler element styled identically to .leaflet-tooltip.sacred-label.mahapurusha-label.
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

  // Fallback if measurement unavailable (SSR or pre-render)
  const fallback = {
    width: Math.max(50, text.length * 9),
    height: 16,
  };
  return fallback;
}

/**
 * Calculate the bounding box for a candidate placement.
 * Faithfully mirrors Leaflet's native Tooltip _setPosition calculation.
 */
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

/**
 * Axis-Aligned Bounding Box (AABB) intersection check with safety padding.
 * Ensures a visual breathing margin between adjacent labels.
 */
export function boxesIntersect(a: Rect, b: Rect, padX = 4, padY = 2): boolean {
  return !(
    a.right + padX <= b.left ||
    a.left >= b.right + padX ||
    a.bottom + padY <= b.top ||
    a.top >= b.bottom + padY
  );
}

/**
 * Check if bounding box fits comfortably within the map container viewport.
 */
export function isBoxWithinBounds(box: Rect, containerWidth: number, containerHeight: number): boolean {
  return (
    box.left >= 0 &&
    box.right <= containerWidth &&
    box.top >= 0 &&
    box.bottom <= containerHeight
  );
}

/**
 * Deterministic priority sorting:
 * 1. Currently selected Mahapurusha gets first pick of placement (priority 0)
 * 2. Stable data index in mahapurushasGeometry
 * 3. Deterministic Mahapurusha ID tie-breaker
 */
export function sortMahapurushasForPlacement(
  items: MahapurushaAnchor[],
  selectedId: string | null | undefined
): MahapurushaAnchor[] {
  return [...items].sort((a, b) => {
    // 1. Currently selected gets priority
    const aSelected = a.id === selectedId;
    const bSelected = b.id === selectedId;
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    // 2. Stable data order
    const indexA = items.indexOf(a);
    const indexB = items.indexOf(b);
    if (indexA !== -1 && indexB !== -1 && indexA !== indexB) {
      return indexA - indexB;
    }

    // 3. Deterministic tie-breaker
    return a.id.localeCompare(b.id);
  });
}

/**
 * Generalized Screen-Space Collision Resolution pass.
 * Projects visible markers into container coordinates, evaluates candidates in preferred order,
 * and assigns non-overlapping positions deterministically.
 */
export function computeMahapurushaPlacements(
  map: L.Map,
  items: MahapurushaAnchor[],
  lang: 'en' | 'kn' | 'hi',
  selectedId: string | null | undefined
): Record<string, CandidatePlacement> {
  const result: Record<string, CandidatePlacement> = {};
  if (!map) {
    for (const item of items) {
      result[item.id] = CANDIDATE_PLACEMENTS[0];
    }
    return result;
  }

  let container: HTMLElement | null = null;
  try {
    container = map.getContainer();
  } catch {
    // Map not ready
  }

  const containerW = container?.clientWidth || 800;
  const containerH = container?.clientHeight || 600;

  const sortedItems = sortMahapurushasForPlacement(items, selectedId);
  const placedBoxes: { id: string; box: Rect; candidate: CandidatePlacement }[] = [];

  for (const person of sortedItems) {
    let pt: L.Point;
    try {
      pt = map.latLngToContainerPoint(L.latLng(person.coords[0], person.coords[1]));
    } catch {
      result[person.id] = CANDIDATE_PLACEMENTS[0];
      continue;
    }

    const title = person.name[lang] || person.name.en;
    const { width, height } = getLabelDimensions(title, container);

    let chosenCandidate: CandidatePlacement | null = null;
    let chosenBox: Rect | null = null;

    // Pass 1: first candidate that doesn't collide with already placed boxes AND is within viewport
    for (const candidate of CANDIDATE_PLACEMENTS) {
      const box = computeLabelBox(pt.x, pt.y, width, height, candidate);
      const collides = placedBoxes.some(p => boxesIntersect(box, p.box));
      if (!collides && isBoxWithinBounds(box, containerW, containerH)) {
        chosenCandidate = candidate;
        chosenBox = box;
        break;
      }
    }

    // Pass 2: if viewport constraint couldn't be met, first candidate that doesn't collide
    if (!chosenCandidate) {
      for (const candidate of CANDIDATE_PLACEMENTS) {
        const box = computeLabelBox(pt.x, pt.y, width, height, candidate);
        const collides = placedBoxes.some(p => boxesIntersect(box, p.box));
        if (!collides) {
          chosenCandidate = candidate;
          chosenBox = box;
          break;
        }
      }
    }

    // Pass 3: least intrusive fallback (Candidate 0)
    if (!chosenCandidate || !chosenBox) {
      chosenCandidate = CANDIDATE_PLACEMENTS[0];
      chosenBox = computeLabelBox(pt.x, pt.y, width, height, chosenCandidate);
    }

    placedBoxes.push({ id: person.id, box: chosenBox, candidate: chosenCandidate });
    result[person.id] = chosenCandidate;
  }

  return result;
}
