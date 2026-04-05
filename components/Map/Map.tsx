'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap as useLeafletMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useMap } from '@/providers/MapContext';
import { useFilter } from '@/providers/FilterContext';
import { Location, Category } from '@/types/location';
import {
  MAP_CONFIG,
  CATEGORY_CONFIG,
} from '@/utils/constants';
import { AKHAND_BHARAT_BOUNDS } from '@/utils/mapBounds';
import 'leaflet/dist/leaflet.css';

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLE MARKER ICONS — Traditional SVG (kept from existing system)
// ═══════════════════════════════════════════════════════════════════════════════

const TEMPLE_SVG = `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="7" y="12" width="10" height="9" fill="#A0522D" stroke="#6B3410" stroke-width="1"/><polygon points="12,3 5,12 19,12" fill="#C47A4C" stroke="#6B3410" stroke-width="1"/><rect x="10.5" y="15" width="3" height="6" fill="#6B3410"/></svg>`;

const createTempleIcon = (isSelected = false) => {
  const cfg = CATEGORY_CONFIG.temple;
  const size = isSelected ? 36 : 28;
  const borderWidth = isSelected ? 2 : 1.5;

  return L.divIcon({
    html: `<div class="cultural-marker ${isSelected ? 'cultural-marker--selected' : ''}" style="
      width:${size}px;height:${size}px;
      background:${cfg.markerBg};
      border:${borderWidth}px solid ${isSelected ? '#8B4513' : 'rgba(160,82,45,0.4)'};
      box-shadow:${isSelected
        ? '0 0 8px rgba(139,69,19,0.3), 0 2px 6px rgba(0,0,0,0.4)'
        : '0 2px 4px rgba(0,0,0,0.3)'};
      animation:${isSelected ? 'pulseGlow 2.5s ease-in-out infinite' : 'none'};
    ">${TEMPLE_SVG}</div>`,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
};

const TEMPLE_ICONS = {
  normal: createTempleIcon(false),
  selected: createTempleIcon(true),
};

// ═══════════════════════════════════════════════════════════════════════════════
// MOUNTAIN RANGE ICONS — Clustered triangle symbols
// ═══════════════════════════════════════════════════════════════════════════════

const createMountainIcon = (isMain: boolean, isSelected = false) => {
  const size = isMain ? (isSelected ? 34 : 26) : 16;
  const fill = isMain ? '#8B7D65' : '#7A6E58';
  const stroke = isMain ? '#5C4E3A' : '#6B5F4E';
  const opacity = isMain ? 1 : 0.7;
  const innerFill = isMain ? '#B09A7A' : '#A08E72';

  const borderColor = isSelected ? '#8B4513' : 'rgba(160,130,100,0.35)';
  const shadow = isSelected
    ? '0 0 6px rgba(139,69,19,0.25), 0 2px 5px rgba(0,0,0,0.35)'
    : isMain
      ? '0 2px 4px rgba(0,0,0,0.25)'
      : '0 1px 2px rgba(0,0,0,0.15)';

  const svg = isMain
    ? `<svg viewBox="0 0 24 24" width="${size * 0.55}" height="${size * 0.55}"><polygon points="12,2 2,22 22,22" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/><polygon points="12,7 6,22 18,22" fill="${innerFill}" stroke="none"/></svg>`
    : `<svg viewBox="0 0 24 24" width="10" height="10"><polygon points="12,4 4,20 20,20" fill="${fill}" stroke="${stroke}" stroke-width="1" opacity="${opacity}"/></svg>`;

  return L.divIcon({
    html: `<div class="mountain-peak ${isMain ? 'mountain-peak--main' : 'mountain-peak--satellite'} ${isSelected ? 'cultural-marker--selected' : ''}" style="
      width:${size}px;height:${size}px;
      background:rgba(92,78,58,${isMain ? 0.8 : 0.45});
      border:${isMain ? 1.5 : 1}px solid ${borderColor};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:${shadow};
      animation:${isSelected ? 'pulseGlow 2.5s ease-in-out infinite' : 'none'};
      transition:all 0.25s ease;
    ">${svg}</div>`,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
};

// ═══════════════════════════════════════════════════════════════════════════════
// RIVER LABEL ICON — Cinzel serif, italic, soft shadow for map integration
// ═══════════════════════════════════════════════════════════════════════════════

const createRiverLabelIcon = (name: string, isSelected = false) =>
  L.divIcon({
    html: `<div class="river-label ${isSelected ? 'river-label--selected' : ''}">${name}</div>`,
    className: 'custom-marker',
    iconSize: [120, 28],
    iconAnchor: [60, 14],
    popupAnchor: [0, -18],
  });

// ═══════════════════════════════════════════════════════════════════════════════
// RIVER LAYER — Cultural soft dashed rendering
//
// Two dashed layers per river create a hand-drawn, flowing feel:
//   Layer 1 — Soft ambient : wide dashed spread, very low opacity (~0.10)
//   Layer 2 — Main flow     : thin dashed line, higher opacity (~0.55)
//
// All layers use uniform weight throughout — no thickening at the delta.
// Muted blues (#4A90E2 family) harmonize with the parchment background.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── River Layer Component ────────────────────────────────────────────────────

interface RiverLayerProps {
  rivers: Location[];
  onRiverClick: (loc: Location) => void;
}

function RiverLayer({ rivers, onRiverClick }: RiverLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  const visible = useMemo(
    () =>
      rivers.filter((r) => activeFilters.river && r.flowPath && r.flowPath.length > 1),
    [rivers, activeFilters]
  );

  // ── Palette: saturated deep blues that stand out on parchment ──────────────
  const PALETTE = {
    // Layer 1 — outer glow halo (light blue luminance)
    glowColor:    '#8AB8DC',
    glowOpacity:     0.18,
    glowWeight:        9,
    glowDash:          '1, 0',   // solid (0 gap = continuous glow)
    // Layer 2 — soft ambient dashed
    outerColor:    '#4A7EB8',
    outerOpacity:    0.25,
    outerWeight:        3.5,
    outerDash:          '5, 8',
    // Layer 3 — main river line (saturated, clearly visible)
    coreColor:      '#1E5FA8',
    coreColorSel:   '#2980C8',
    coreOpacity:     0.80,
    coreOpacitySel:  0.95,
    coreWeight:         1.5,
    coreDash:           '1, 6',
  };

  return (
    <>
      {visible.map((river) => {
        const sel = selectedLocation?.id === river.id;
        const path = river.flowPath as [number, number][];

        // Label at ~40% along path
        const labelIdx = Math.floor(path.length * 0.4);
        const labelPoint = path[labelIdx];

        const coreColor   = sel ? PALETTE.coreColorSel  : PALETTE.coreColor;
        const coreOpacity = sel ? PALETTE.coreOpacitySel : PALETTE.coreOpacity;

        return (
          <React.Fragment key={river.id}>
            {/* ── Layer 1: Outer glow halo ─────────────────────────────────── */}
            <Polyline
              positions={path}
              smoothFactor={1.8}
              pathOptions={{
                color: PALETTE.glowColor,
                weight: PALETTE.glowWeight,
                opacity: PALETTE.glowOpacity,
                dashArray: PALETTE.glowDash,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />

            {/* ── Layer 2: Soft dashed ambient ───────────────────────────── */}
            <Polyline
              positions={path}
              smoothFactor={1.5}
              pathOptions={{
                color: PALETTE.outerColor,
                weight: PALETTE.outerWeight,
                opacity: PALETTE.outerOpacity,
                dashArray: PALETTE.outerDash,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />

            {/* ── Layer 3: Main dashed flow (interactive) ─────────────────── */}
            <Polyline
              positions={path}
              smoothFactor={1.5}
              pathOptions={{
                color: coreColor,
                weight: PALETTE.coreWeight,
                opacity: coreOpacity,
                dashArray: PALETTE.coreDash,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              eventHandlers={{ click: () => onRiverClick(river) }}
            />

            {/* ── River name label ───────────────────────────────────────── */}
            <Marker
              position={labelPoint}
              icon={createRiverLabelIcon(river.name, sel)}
              eventHandlers={{ click: () => onRiverClick(river) }}
              zIndexOffset={30}
            >
              <Popup>
                <div className="popup-inner">
                  <h3>{river.name}</h3>
                  {river.nameHindi && <p>{river.nameHindi}</p>}
                  <button onClick={() => onRiverClick(river)} className="popup-btn">
                    View Details ›
                  </button>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOUNTAIN LAYER — Clustered range symbols
// ═══════════════════════════════════════════════════════════════════════════════

interface MountainLayerProps {
  mountains: Location[];
  onMountainClick: (loc: Location) => void;
}

function MountainLayer({ mountains, onMountainClick }: MountainLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  const visible = useMemo(
    () => mountains.filter((m) => activeFilters.mountain),
    [mountains, activeFilters]
  );

  return (
    <>
      {visible.map((mt) => {
        const sel = selectedLocation?.id === mt.id;

        return (
          <React.Fragment key={mt.id}>
            {/* Satellite peaks (smaller triangles around main peak) */}
            {mt.rangePoints?.map((pt, i) => (
              <Marker
                key={`${mt.id}-sat-${i}`}
                position={[pt.lat, pt.lng]}
                icon={createMountainIcon(false, false)}
                eventHandlers={{ click: () => onMountainClick(mt) }}
                zIndexOffset={sel ? 500 : 0}
              />
            ))}

            {/* Main peak (larger, interactive) */}
            <Marker
              position={[mt.latitude, mt.longitude]}
              icon={createMountainIcon(true, sel)}
              eventHandlers={{ click: () => onMountainClick(mt) }}
              zIndexOffset={sel ? 1000 : 100}
            >
              <Popup>
                <div className="popup-inner">
                  <h3>{mt.name}</h3>
                  {mt.nameHindi && <p>{mt.nameHindi}</p>}
                  <button onClick={() => onMountainClick(mt)} className="popup-btn">
                    View Details ›
                  </button>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLE LAYER — Traditional point markers (unchanged behavior)
// ═══════════════════════════════════════════════════════════════════════════════

interface TempleLayerProps {
  temples: Location[];
  onTempleClick: (loc: Location) => void;
}

function TempleLayer({ temples, onTempleClick }: TempleLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  const visible = useMemo(
    () => temples.filter(() => activeFilters.temple),
    [temples, activeFilters]
  );

  return (
    <>
      {visible.map((temple) => {
        const sel = selectedLocation?.id === temple.id;
        return (
          <Marker
            key={temple.id}
            position={[temple.latitude, temple.longitude]}
            icon={sel ? TEMPLE_ICONS.selected : TEMPLE_ICONS.normal}
            eventHandlers={{ click: () => onTempleClick(temple) }}
            zIndexOffset={sel ? 1000 : 0}
          >
            <Popup>
              <div className="popup-inner">
                <h3>{temple.name}</h3>
                {temple.nameHindi && <p>{temple.nameHindi}</p>}
                <button onClick={() => onTempleClick(temple)} className="popup-btn">
                  View Details ›
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARCHMENT TEXTURE OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════

function ParchmentOverlay() {
  const map = useLeafletMap();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = map.getContainer();
    const div = document.createElement('div');
    div.className = 'parchment-texture-layer';
    container.appendChild(div);
    divRef.current = div;

    return () => {
      if (divRef.current && divRef.current.parentNode) {
        divRef.current.parentNode.removeChild(divRef.current);
        divRef.current = null;
      }
    };
  }, [map]);

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEWPORT CONTROLLER
// ═══════════════════════════════════════════════════════════════════════════════

function MapViewController() {
  const map = useLeafletMap();
  const didInit = useRef(false);

  const applyViewport = useCallback(() => {
    map.invalidateSize({ animate: false });
    map.fitBounds(AKHAND_BHARAT_BOUNDS, { padding: [0, 0], animate: false });
    map.setMaxBounds(AKHAND_BHARAT_BOUNDS);
    map.options.maxBoundsViscosity = MAP_CONFIG.MAX_BOUNDS_VISCOSITY;
  }, [map]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    map.options.minZoom = MAP_CONFIG.MIN_ZOOM;
    map.options.maxZoom = MAP_CONFIG.MAX_ZOOM;
    applyViewport();
    requestAnimationFrame(() => applyViewport());
  }, [map, applyViewport]);

  useEffect(() => {
    const onResize = () => applyViewport();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyViewport]);

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CULTURAL MAP — Main Export
// ═══════════════════════════════════════════════════════════════════════════════

interface CulturalMapProps {
  locations: Location[];
  onMarkerClick: (loc: Location) => void;
}

export function CulturalMap({ locations, onMarkerClick }: CulturalMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Split locations by category for separate layer rendering
  const rivers = useMemo(() => locations.filter((l) => l.category === 'river'), [locations]);
  const mountains = useMemo(() => locations.filter((l) => l.category === 'mountain'), [locations]);
  const temples = useMemo(() => locations.filter((l) => l.category === 'temple'), [locations]);

  if (!mounted) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#1C1A17', gap: '14px',
      }}>
        <div className="map-loading-spinner" />
        <span style={{ color: '#A89882', fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '0.1em' }}>
          Loading cultural atlas…
        </span>
      </div>
    );
  }

  return (
    <MapContainer
      center={MAP_CONFIG.CENTER}
      zoom={MAP_CONFIG.MIN_ZOOM}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
      zoomSnap={MAP_CONFIG.ZOOM_SNAP}
      zoomDelta={MAP_CONFIG.ZOOM_DELTA}
      maxBounds={AKHAND_BHARAT_BOUNDS}
      maxBoundsViscosity={MAP_CONFIG.MAX_BOUNDS_VISCOSITY}
      worldCopyJump={MAP_CONFIG.WORLD_COPY_JUMP}
      zoomControl={true}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Base tiles — sepia-filtered via CSS */}
      <TileLayer
        attribution={MAP_CONFIG.TILE_ATTRIBUTION}
        url={MAP_CONFIG.TILE_URL}
        noWrap={MAP_CONFIG.TILE_NO_WRAP}
        bounds={AKHAND_BHARAT_BOUNDS}
      />

      {/* Parchment texture */}
      <ParchmentOverlay />

      {/* Viewport controller */}
      <MapViewController />

      {/* ── Layer 1: Rivers (polylines — lowest z-order) ─────────────── */}
      <RiverLayer rivers={rivers} onRiverClick={onMarkerClick} />

      {/* ── Layer 2: Mountains (clustered ranges — mid z-order) ──────── */}
      <MountainLayer mountains={mountains} onMountainClick={onMarkerClick} />

      {/* ── Layer 3: Temples (point markers — highest z-order) ───────── */}
      <TempleLayer temples={temples} onTempleClick={onMarkerClick} />
    </MapContainer>
  );
}
