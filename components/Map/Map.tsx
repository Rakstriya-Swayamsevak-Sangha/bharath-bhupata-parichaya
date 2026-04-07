'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
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
import { useLanguageStore } from '@/store/languageStore';
import { getContent } from '@/lib/i18n';
import { mountainsGeometry } from '@/data/mountainsGeometry';
import { riversGeometry } from '@/data/riversGeometry';
import { Location, Category } from '@/types/location';
import {
  MAP_CONFIG,
  CATEGORY_CONFIG,
} from '@/utils/constants';
import { AKHAND_BHARAT_BOUNDS } from '@/utils/mapBounds';
import 'leaflet/dist/leaflet.css';

// ═══════════════════════════════════════════════════════════════════════════════
// SACRED CITIES MARKERS — Copper engraving aesthetic
// ═══════════════════════════════════════════════════════════════════════════════

const SACRED_CITIES = [
  { id: "takshashila", name: "Takshashila", coords: [33.745, 72.787] },
  { id: "amritsar", name: "Amritsar", coords: [31.634, 74.872] },
  { id: "indraprastha", name: "Indraprastha", coords: [28.6139, 77.2090] },
  { id: "mathura", name: "Mathura", coords: [27.4924, 77.6737] },
  { id: "ayodhya", name: "Ayodhya", coords: [26.7999, 82.2042] },
  { id: "vaishali", name: "Vaishali", coords: [25.9870, 85.1290] },
  { id: "patliputra", name: "Patliputra", coords: [25.5941, 85.1376] },
  { id: "prayag", name: "Prayag", coords: [25.4358, 81.8463] },
  { id: "gaya", name: "Gaya", coords: [24.7955, 85.0002] },
  { id: "avanthika", name: "Avanthika", coords: [23.1765, 75.7885] },
  { id: "dwarka", name: "Dwarka", coords: [22.2442, 68.9685] },
  { id: "somanath", name: "Somanath", coords: [20.8880, 70.4012] },
  { id: "nagpur", name: "Nagpur", coords: [21.1458, 79.0882] },
  { id: "puri", name: "Puri", coords: [19.8135, 85.8312] },
  { id: "vijayanagar", name: "Vijaynagar", coords: [15.3350, 76.4600] },
  { id: "kanchi", name: "Kanchi", coords: [12.8342, 79.7036] }
];

function adjustCoords(id: string, lat: number, lng: number): [number, number] {
  const offsetMap: Record<string, [number, number]> = {
    "vaishali": [0.15, 0.2],
    "patliputra": [-0.1, 0.2],
    "prayag": [-0.1, -0.3],
    "mathura": [0.1, -0.2],
    "indraprastha": [0.15, 0.15],
  };

  if (offsetMap[id]) {
    return [
      lat + offsetMap[id][0],
      lng + offsetMap[id][1]
    ];
  }

  return [lat, lng];
}

const createSacredMarker = (isSelected = false) => {
  return L.divIcon({
    className: 'custom-marker', // clears leaflet defaults
    html: `
      <div class="marker-wrapper ${isSelected ? 'marker-wrapper--selected' : ''}">
        <div class="marker-glow"></div>
        <div class="marker-core">
          <div class="marker-symbol">ॐ</div>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
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
  ridge: '#7A6445',
  shadow: '#4E3B24',
  highlight: '#A8906A',
};

// Per-range configuration
// zoneWidth = perpendicular spread for terrain zone polygon
// density   = number of parallel ridge strokes
// importance = visual weight multiplier (1.0 = HIGH, 0.6 = MED, 0.3 = LOW)
const TERRAIN_CONFIG: Record<string, { zoneWidth: number; density: number; importance: number }> = {
  'himalaya': { zoneWidth: 3.0, density: 8, importance: 1.0 },  // Himalaya — HIGH
  'sahyadri': { zoneWidth: 1.2, density: 4, importance: 0.5 },  // Sahyadri — LOW (elongated)
  'malaya': { zoneWidth: 0.8, density: 2, importance: 0.35 }, // Malaya — LOW
  'mahendra': { zoneWidth: 1.0, density: 3, importance: 0.4 }, // Mahendra — LOW (coastal slant)
  'vindhya': { zoneWidth: 1.8, density: 5, importance: 0.7 }, // Vindhya — MEDIUM
  'aravalli': { zoneWidth: 1.6, density: 4, importance: 0.65 },// Aravalli — MEDIUM
};

// Jitter — removes machine-precision look, gives hand-drawn feel
const jitter = () => (Math.random() - 0.5) * 0.25;

// Distortion — stylized map compresses north-south slightly, stretches east-west
const distort = ([lat, lng]: [number, number]): [number, number] => [
  lat * 0.98 + 0.5,
  lng * 1.01,
];

// ─── Subdued Cartographic Mountain Strokes ─────────────────────────────────────
function MountainLinesLayer() {
  const { activeFilters } = useFilter();

  if (!activeFilters.mountain) return null;

  return (
    <>
      {mountainsGeometry.map((mt) => {
        const coords = mt.path;

        // Controlled, precise structural bend (zig-zag) instead of random chaos
        // Alternates slightly on the axis to create a stable, beautiful hand-drawn wave
        const path = coords.map(([lat, lng], i) => {
          const bendX = i % 2 === 0 ? 0.04 : -0.04;
          const bendY = i % 2 === 0 ? -0.04 : 0.04;
          return [lat + bendX, lng + bendY] as [number, number];
        });

        const mainWeight = mt.id === 'himalaya' ? 2.2 : 1.7; // Hierarchical weighting

        return (
          <React.Fragment key={`${mt.id}-lines`}>
            {/* Depth Shadow Layer (down-right offset) */}
            <Polyline
              positions={path.map(([lat, lng]) => [lat - 0.015, lng + 0.015])}
              smoothFactor={3.5}
              pathOptions={{
                color: 'rgba(0,0,0,0.08)',
                weight: mainWeight + 1,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />

            {/* Glow Layer (Soft aura) */}
            <Polyline
              positions={path}
              smoothFactor={3.5}
              pathOptions={{
                color: '#A1866F',
                weight: 5,
                opacity: 0.12,
                lineCap: 'round',
                lineJoin: 'round',
                className: 'terrain-polygon-blur', // softness
              }}
              interactive={false}
            />

            {/* Main Core Stroke (Ink) */}
            <Polyline
              positions={path}
              smoothFactor={3}
              pathOptions={{
                color: '#4A3722',
                weight: mainWeight,
                opacity: 0.85,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />

            {/* Subtle Highlight Layer (dashed) */}
            <Polyline
              positions={path.map(([lat, lng]) => [lat + 0.01, lng - 0.01])}
              smoothFactor={3.5}
              pathOptions={{
                color: '#C2A98A',
                weight: 0.8,
                opacity: 0.25,
                dashArray: "2,4",
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
function MountainLabelsLayer({ onMountainClick }: { onMountainClick: (loc: Location) => void }) {
  const { lang } = useLanguageStore();
  const content = getContent(lang);
  const { activeFilters } = useFilter();

  if (!activeFilters.mountain) return null;

  return (
    <>
      {mountainsGeometry.map((mt) => {
        const coords = mt.path;
        const centerIdx = Math.floor(coords.length / 2);
        const label = content.mountains[mt.id as keyof typeof content.mountains] ?? mt.id;

        let angle = 0;
        if (coords.length >= 2) {
          const p1 = coords[0];
          const p2 = coords[coords.length - 1];
          const latDiff = p2[0] - p1[0];
          const lngDiff = p2[1] - p1[1];
          let cssAngle = Math.atan2(-latDiff, lngDiff) * (180 / Math.PI);
          if (cssAngle > 90) cssAngle -= 180;
          if (cssAngle < -90) cssAngle += 180;
          angle = cssAngle;
        }

        return (
          <React.Fragment key={`${mt.id}-labels`}>
            {/* Invisible wide clickable path */}
            <Polyline
              positions={coords}
              pathOptions={{ color: 'transparent', weight: 40, opacity: 0 }}
              eventHandlers={{ click: () => onMountainClick({ id: mt.id, category: 'mountain', name: mt.id } as Location) }}
            />
            {/* Rotated range label (Elevated above line) */}
            <Marker
              position={coords[centerIdx]}
              icon={L.divIcon({
                html: `<div class="mountain-label" style="transform: rotate(${angle}deg); transform-origin: center center;">${label}</div>`,
                className: 'custom-marker',
                iconSize: [140, 22],
                iconAnchor: [70, 19],
              })}
              zIndexOffset={0}
              eventHandlers={{ click: () => onMountainClick({ id: mt.id, category: 'mountain', name: mt.id } as Location) }}
            />
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

function RiverLayer({ onRiverClick }: { onRiverClick: (loc: Location) => void }) {
  const { lang } = useLanguageStore();
  const content = getContent(lang);
  const { activeFilters } = useFilter();
  const { selectedLocation } = useMap();

  if (!activeFilters.river) return null;

  const PALETTE = {
    glowColor: '#8AB8DC',
    glowOpacity: 0.18,
    glowWeight: 9,
    glowDash: '1, 0',
    outerColor: '#4A7EB8',
    outerOpacity: 0.25,
    outerWeight: 3.5,
    outerDash: '5, 8',
    coreColor: '#1E5FA8',
    coreColorSel: '#2980C8',
    coreOpacity: 0.60,
    coreOpacitySel: 0.95,
    coreWeight: 1.5,
    coreWeightSel: 2.2,
    coreDash: '1, 6',
  };

  return (
    <>
      {riversGeometry.map((river) => {
        const isSelected = selectedLocation?.id === river.id;
        const path = river.path;
        const labelIdx = Math.floor(path.length * 0.4);
        const labelPoint = path[labelIdx];
        const label = content.rivers[river.id as keyof typeof content.rivers] ?? river.id;

        // 🎯 Dynamic Visual Hierarchy
        let scale = 1.0;
        if (river.id === 'ganga') scale = 1.6;
        if (river.id === 'brahmaputra') scale = 2.2;
        if (river.id === 'sindhu') scale = 1.3;
        if (river.id === 'yamuna') scale = 0.8;
        if (river.id === 'gandaki') scale = 0.7;
        if (river.id === 'narmada') scale = 1.25;
        if (river.id === 'godavari') scale = 1.45;
        if (river.id === 'mahanadi') scale = 1.15;
        if (river.id === 'krishna') scale = 1.35;
        if (river.id === 'kaveri') scale = 1.0;
        
        const isSaraswati = river.id === 'saraswati';
        let coreColor = PALETTE.coreColor;
        if (river.id === 'yamuna') coreColor = '#104975'; // Yamuna slightly darker
        if (river.id === 'narmada') coreColor = '#1565c0'; // Narmada strong independent blue
        if (river.id === 'godavari') coreColor = '#1e88e5'; // Godavari bright respectable blue
        if (river.id === 'mahanadi') coreColor = '#2baf63bb'; // Mahanadi slightly teal for delta/marshy feel
        if (river.id === 'krishna') coreColor = '#1976d2'; // Krishna deep flow blue
        if (river.id === 'kaveri') coreColor = '#3f51b5'; // Kaveri rich temple-zone indigo

        return (
          <React.Fragment key={river.id}>
            {/* Base Glow */}
            <Polyline
              positions={path}
              smoothFactor={1.8}
              pathOptions={{
                color: isSelected ? '#A8D8FC' : PALETTE.glowColor,
                weight: (isSelected ? 12 : PALETTE.glowWeight) * scale,
                opacity: isSaraswati ? 0.1 : (isSelected ? 0.35 : PALETTE.glowOpacity),
                dashArray: isSaraswati ? '2, 10' : PALETTE.glowDash,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />
            {/* Outer Soft Dashed */}
            <Polyline
              positions={path}
              smoothFactor={1.5}
              pathOptions={{
                color: PALETTE.outerColor,
                weight: (isSelected ? 5 : PALETTE.outerWeight) * scale,
                opacity: isSaraswati ? 0.15 : (isSelected ? 0.4 : PALETTE.outerOpacity),
                dashArray: isSaraswati ? '4, 12' : PALETTE.outerDash,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              interactive={false}
            />
            {/* Core Fine Dashed */}
            <Polyline
              positions={path}
              smoothFactor={1.5}
              pathOptions={{
                color: isSelected ? PALETTE.coreColorSel : coreColor,
                weight: (isSelected ? PALETTE.coreWeightSel : PALETTE.coreWeight) * scale,
                opacity: isSaraswati ? 0.3 : (isSelected ? PALETTE.coreOpacitySel : PALETTE.coreOpacity),
                dashArray: isSaraswati ? '2, 8' : (isSelected ? '0' : PALETTE.coreDash),
                lineCap: 'round',
                lineJoin: 'round',
              }}
              eventHandlers={{ 
                click: () => onRiverClick({ 
                  id: river.id, 
                  category: 'river', 
                  name: river.id,
                  latitude: labelPoint[0],
                  longitude: labelPoint[1]
                } as Location) 
              }}
            />
            {/* Label */}
            <Marker
              position={labelPoint}
              icon={createRiverLabelIcon(label, isSelected)}
              eventHandlers={{ 
                click: () => onRiverClick({ 
                  id: river.id, 
                  category: 'river', 
                  name: river.id,
                  latitude: labelPoint[0],
                  longitude: labelPoint[1]
                } as Location) 
              }}
              zIndexOffset={isSelected ? 100 : 30}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SACRED CITIES LAYER
// ═══════════════════════════════════════════════════════════════════════════════

function SacredCitiesLayer() {
  const { activeFilters } = useFilter();
  const { lang } = useLanguageStore();
  const content = getContent(lang);

  if (!activeFilters.temple) return null;

  return (
    <>
      {SACRED_CITIES.map((city) => {
        const translatedName = content.sacredCities.find((c: { id: string; name: string }) => c.id === city.id)?.name ?? city.name;
        const [lat, lng] = adjustCoords(city.id, city.coords[0], city.coords[1]);
        return (
          <Marker
            key={city.id}
            position={[lat, lng]}
            icon={createSacredMarker()}
          >
            <Tooltip
              permanent
              direction="bottom"
              offset={[0, 14]}
              className="sacred-label"
              opacity={0.9}
            >
              {translatedName}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

function formatLabel(name: string) {
  if (name.includes("(")) {
    const [main, sub] = name.split("(");
    return `
      <div class="label-main">${main.trim()}</div>
      <div class="label-sub">${sub.replace(")", "").trim()}</div>
    `;
  }
  return `<div class="label-main">${name}</div>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC GEOGRAPHY LABELS (Countries & Oceans)
// ═══════════════════════════════════════════════════════════════════════════════

const COUNTRY_LABELS = [
  { name: "AFGHANISTAN (GANDHARA)", coords: [33.5, 68.0] as [number, number] },
  { name: "PAKISTAN", coords: [28.5, 70.0] as [number, number] },
  { name: "NEPAL", coords: [28.2, 84.5] as [number, number] },
  { name: "BANGLADESH", coords: [23.7, 90.3] as [number, number] },
  { name: "BRAHMADESH", coords: [21.5, 96.0] as [number, number] },
  { name: "SRI LANKA", coords: [7.8, 80.7] as [number, number] }
];

const OCEAN_LABELS = [
  { name: "ARABIAN SEA (SINDHU SAGAR)", coords: [16.0, 62.0] as [number, number] },
  { name: "INDIAN OCEAN (HINDU MAHASAGAR)", coords: [3.2, 79.5] as [number, number] },
  { name: "BAY OF BENGAL (GANGA SAGAR)", coords: [18.5, 90.0] as [number, number] }
];

function StaticLabelsLayer() {
  // Static scale typography — centered markers to prevent drifting on zoom closer
  const labelWidth = 200;
  const labelHeight = 60;

  return (
    <>
      {COUNTRY_LABELS.map((item, idx) => (
        <Marker
          key={`country-${idx}`}
          position={item.coords}
          interactive={false}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="country-label">${formatLabel(item.name)}</div>`,
            iconSize: [labelWidth, labelHeight],
            iconAnchor: [labelWidth / 2, labelHeight / 2],
          })}
        />
      ))}
      {OCEAN_LABELS.map((item, idx) => (
        <Marker
          key={`ocean-${idx}`}
          position={item.coords}
          interactive={false}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="ocean-label">${formatLabel(item.name)}</div>`,
            iconSize: [labelWidth, labelHeight],
            iconAnchor: [labelWidth / 2, labelHeight / 2],
          })}
        />
      ))}
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
  onMarkerClick: (loc: Location) => void;
}

export function CulturalMap({ onMarkerClick }: CulturalMapProps) {
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
        <MountainLinesLayer />
      </Pane>

      {/* ── Layer 2.5: Static Map Labels ──────── */}
      <Pane name="staticLabelsPane" style={{ zIndex: 250 }}>
        <StaticLabelsLayer />
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
        <RiverLayer onRiverClick={onMarkerClick} />
      </Pane>

      {/* ── Layer 5: Mountain labels ──────── */}
      <Pane name="peakPane" style={{ zIndex: 500 }}>
        <MountainLabelsLayer onMountainClick={onMarkerClick} />
      </Pane>

      {/* ── Layer 6: Sacred Cities (highest z-order) ───────── */}
      <Pane name="poiPane" style={{ zIndex: 600 }}>
        <SacredCitiesLayer />
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
              [-2, 55],
              [-2, 105],
              [40, 105],
              [40, 55],
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
