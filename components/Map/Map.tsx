'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  GeoJSON,
  ImageOverlay,
  Pane,
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
// MOUNTAIN SYSTEM — Terrain-Based Cartographic Rendering
//
// 3-layer approach:
//   1. Terrain Zones     — soft polygon fills, defines mountain mass
//   2. Internal Texture   — sparse hatching for grain/depth
//   3. Ridge Lines        — directional strokes scaled by importance
//
// Rendering rules (non-negotiable):
//   smoothFactor: 3  — maintains natural curvature
//   lineJoin: "round" — no sharp angles
//   lineCap: "round"  — soft terminations
// ═══════════════════════════════════════════════════════════════════════════════

const MT_PALETTE = {
  ridge:     '#7A6445',
  shadow:    '#4E3B24',
  highlight: '#A8906A',
};

// Per-range configuration
// zoneWidth = perpendicular spread for terrain zone polygon
// density   = number of parallel ridge strokes
// importance = visual weight multiplier (1.0 = HIGH, 0.6 = MED, 0.3 = LOW)
const TERRAIN_CONFIG: Record<string, { zoneWidth: number; density: number; importance: number }> = {
  'mt-001': { zoneWidth: 3.0, density: 8, importance: 1.0 },  // Himalaya — HIGH
  'mt-002': { zoneWidth: 1.2, density: 4, importance: 0.5 },  // Sahyadri — LOW (elongated)
  'mt-003': { zoneWidth: 0.8, density: 2, importance: 0.35 }, // Malaya — LOW
  'mt-004': { zoneWidth: 1.0, density: 3, importance: 0.4 }, // Mahendra — LOW (coastal slant)
  'mt-005': { zoneWidth: 1.8, density: 5, importance: 0.7 }, // Vindhya — MEDIUM
  'mt-006': { zoneWidth: 1.6, density: 4, importance: 0.65 },// Aravalli — MEDIUM
  'mt-007': { zoneWidth: 1.2, density: 3, importance: 0.5 }, // Satpura — MEDIUM-LOW
};

// Jitter — removes machine-precision look, gives hand-drawn feel
const jitter = () => (Math.random() - 0.5) * 0.25;

// Distortion — stylized map compresses north-south slightly, stretches east-west
const distort = ([lat, lng]: [number, number]): [number, number] => [
  lat * 0.98 + 0.5,
  lng * 1.01,
];

interface MountainLayerProps {
  mountains: Location[];
  onMountainClick: (loc: Location) => void;
}

// ─── Minimalistic Mountain Renderer ──────────────────────────────────────────────
function MountainLinesLayer({ mountains }: { mountains: Location[] }) {
  const { activeFilters } = useFilter();

  const visible = useMemo(
    () => mountains.filter((m) => activeFilters.mountain && m.coords && m.coords.length > 1),
    [mountains, activeFilters]
  );

  return (
    <>
      {visible.map((mt) => {
        const coords = mt.coords as [number, number][];
        const path = coords.map(distort);

        return (
          <React.Fragment key={`${mt.id}-lines`}>
            {/* Glow layer (background) */}
            <Polyline
              positions={path}
              smoothFactor={3}
              pathOptions={{
                color: '#9C7A4A',
                weight: 6,
                opacity: 0.18,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />
            {/* Core line (sharp) */}
            <Polyline
              positions={path}
              smoothFactor={3}
              pathOptions={{
                color: '#4A3722',
                weight: 2,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── Interaction & Labelling ─────────────────────────────────────────────────
function MountainLabelsLayer({ mountains, onMountainClick }: MountainLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  const visible = useMemo(
    () => mountains.filter((m) => activeFilters.mountain && m.coords && m.coords.length > 1),
    [mountains, activeFilters]
  );

  return (
    <>
      {visible.map((mt) => {
        const coords = mt.coords as [number, number][];
        const centerIdx = Math.floor(coords.length / 2);
        const sel = selectedLocation?.id === mt.id;

        let angle = 0;
        if (coords.length >= 2) {
          const p1 = coords[0];
          const p2 = coords[coords.length - 1];
          const latDiff = p2[0] - p1[0];
          const lngDiff = p2[1] - p1[1];
          let cssAngle = Math.atan2(-latDiff, lngDiff) * (180 / Math.PI);
          if (cssAngle > 90)  cssAngle -= 180;
          if (cssAngle < -90) cssAngle += 180;
          angle = cssAngle;
        }

        return (
          <React.Fragment key={`${mt.id}-labels`}>
            {/* Invisible wide clickable path (distorted to match rendered mountain) */}
            <Polyline
              positions={coords.map(distort)}
              pathOptions={{ color: 'transparent', weight: 18, opacity: 0 }}
              eventHandlers={{ click: () => onMountainClick(mt) }}
            />
            {/* Rotated range label */}
            <Marker
              position={distort(coords[centerIdx])}
              icon={L.divIcon({
                html: `<div class="mountain-label" style="transform: rotate(${angle}deg); transform-origin: center center;">${mt.name}</div>`,
                className: 'custom-marker',
                iconSize: [140, 22],
                iconAnchor: [70, 11],
              })}
              zIndexOffset={sel ? 100 : 0}
              eventHandlers={{ click: () => onMountainClick(mt) }}
            >
              <Popup>
                <div className="popup-inner">
                  <h3>{mt.name}</h3>
                  {mt.nameHindi && <p>{mt.nameHindi}</p>}
                  {mt.metadata?.elevation && <p style={{ fontSize: '11px', opacity: 0.7 }}>▲ {mt.metadata.elevation}</p>}
                  <button onClick={() => onMountainClick(mt)} className="popup-btn">View Details ›</button>
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
// ═══════════════════════════════════════════════════════════════════════════════

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

  const PALETTE = {
    glowColor:    '#8AB8DC',
    glowOpacity:     0.18,
    glowWeight:        9,
    glowDash:          '1, 0',
    outerColor:    '#4A7EB8',
    outerOpacity:    0.25,
    outerWeight:        3.5,
    outerDash:          '5, 8',
    coreColor:      '#1E5FA8',
    coreColorSel:   '#2980C8',
    coreOpacity:     0.60,
    coreOpacitySel:  0.95,
    coreWeight:         1.5,
    coreDash:           '1, 6',
  };

  return (
    <>
      {visible.map((river) => {
        const sel = selectedLocation?.id === river.id;
        const path = river.flowPath as [number, number][];
        const labelIdx = Math.floor(path.length * 0.4);
        const labelPoint = path[labelIdx];
        const coreColor   = sel ? PALETTE.coreColorSel  : PALETTE.coreColor;
        const coreOpacity = sel ? PALETTE.coreOpacitySel : PALETTE.coreOpacity;

        return (
          <React.Fragment key={river.id}>
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

    // Fix tilePane to be at zIndex 100
    const tilePane = map.getPane('tilePane');
    if (tilePane) tilePane.style.zIndex = '100';

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
  const [bordersData, setBordersData] = useState<any>(null);
  const [stateBorders, setStateBorders] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/countries.geojson')
      .then(r => r.json())
      .then(setBordersData)
      .catch(console.error);
    fetch('/india_states.geojson')
      .then(r => r.json())
      .then(setStateBorders)
      .catch(console.error);
  }, []);

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
      {/* Viewport controller fixes tilePane z-index before other components */}
      <MapViewController />

      {/* ── Layer 1: Base tiles — CartoDB light_nolabels ──────── */}
      <TileLayer
        attribution={MAP_CONFIG.TILE_ATTRIBUTION}
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        noWrap={MAP_CONFIG.TILE_NO_WRAP}
        bounds={AKHAND_BHARAT_BOUNDS}
      />

      {/* Parchment texture */}
      <ParchmentOverlay />

      {/* ── Layer 2: Terrain (glow + core line) ──────── */}
      <Pane name="terrainPane" style={{ zIndex: 200 }}>
        <MountainLinesLayer mountains={mountains} />
      </Pane>

      {/* ── Layer 3: Borders ──────── */}
      <Pane name="borderPane" style={{ zIndex: 300 }}>
        {bordersData && (
          <GeoJSON
            data={bordersData}
            style={{
              color: "#7A6A4F",
              weight: 0.8,
              opacity: 0.4,
              fillOpacity: 0
            }}
            interactive={false}
          />
        )}
        {stateBorders && (
          <GeoJSON
            data={stateBorders}
            style={{
              color: "#7A6A4F",
              weight: 0.5,
              opacity: 0.25,
              dashArray: "2,4",
              fillOpacity: 0
            }}
            interactive={false}
          />
        )}
      </Pane>

      {/* ── Layer 4: Rivers ─────────────── */}
      <Pane name="riverPane" style={{ zIndex: 400 }}>
        <RiverLayer rivers={rivers} onRiverClick={onMarkerClick} />
      </Pane>

      {/* ── Layer 5: Mountain labels ──────── */}
      <Pane name="peakPane" style={{ zIndex: 500 }}>
        <MountainLabelsLayer mountains={mountains} onMountainClick={onMarkerClick} />
      </Pane>

      {/* ── Layer 6: Temples / POIs (highest z-order) ───────── */}
      <Pane name="poiPane" style={{ zIndex: 600 }}>
        <TempleLayer temples={temples} onTempleClick={onMarkerClick} />
      </Pane>

      {/* ── Final Mask Layer: Hides everything completely outside defined bounds ───────── */}
      <Pane name="maskPane" style={{ zIndex: 800 }}>
        <Polygon
          positions={[
            [
              [-90, -180],
              [90, -180],
              [90, 180],
              [-90, 180],
            ],
            [
              [5, 60],
              [5, 100],
              [37, 100],
              [37, 60],
            ]
          ]}
          pathOptions={{
            color: 'transparent',
            fillColor: '#1C1A17',
            fillOpacity: 1,
            weight: 0
          }}
          interactive={false}
        />
      </Pane>
    </MapContainer>
  );
}
