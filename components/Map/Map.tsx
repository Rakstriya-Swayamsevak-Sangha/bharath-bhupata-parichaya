'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  MapContainer,
  Marker,
  Tooltip,
  Polyline,
  Polygon,
  GeoJSON,
  Pane,
  useMap as useLeafletMap,
  ZoomControl,
  Rectangle,
} from 'react-leaflet';
import L from 'leaflet';
import { useMap } from '@/providers/MapContext';
import { useFilter } from '@/providers/FilterContext';
import { useLanguageStore } from '@/store/languageStore';
import { mountainsGeometry } from '@/data/mountainsGeometry';
import { riversGeometry } from '@/data/riversGeometry';
import { COUNTRY_LABELS } from '@/data/regionsGeometry';
import { Location } from '@/types/location';
import {
  MAP_CONFIG,
  CATEGORY_CONFIG,
} from '@/utils/constants';
import { REGION_BOUNDS } from '@/utils/mapBounds';
import { adjustCoords, getPreciseZoom } from '@/utils/geo';
import 'leaflet/dist/leaflet.css';

// ═══════════════════════════════════════════════════════════════════════════════
// LEAFLET ASSET CONTRACT — Explicit absolute path mapping for marker icons
// ═══════════════════════════════════════════════════════════════════════════════
/** @ts-ignore */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

// ════════════════════════════════════════════════════
// SACRED CITIES MARKERS — Copper engraving aesthetic
// ════════════════════════════════════════════════════

const createSacredMarker = (isSelected = false) => {
  return L.divIcon({
    className: 'custom-marker', // clears leaflet defaults
    html: `
      <div class="marker-touch-target" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
        <div class="marker-wrapper ${isSelected ? 'marker-active' : ''}">
          <div class="marker-glow"></div>
          <div class="marker-core">
            <div class="marker-symbol">ॐ</div>
          </div>
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
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
  'raivataka': { zoneWidth: 0.6, density: 2, importance: 0.3 }, // Raivataka — LOW
};

// Jitter — removes machine-precision look, gives hand-drawn feel
const jitter = () => (Math.random() - 0.5) * 0.25;

// Distortion — stylized map compresses north-south slightly, stretches east-west
const distort = ([lat, lng]: [number, number]): [number, number] => [
  lat * 0.98 + 0.5,
  lng * 1.01,
];

// ─── Subdued Cartographic Mountain Strokes ─────────────────────────────────────
const MountainLinesLayer = React.memo(function MountainLinesLayer() {
  const { activeFilters } = useFilter();

  if (!activeFilters.mountain) return null;

  return (
    <>
      {mountainsGeometry.map((mt) => {
        const coords = mt.path;
        const path = coords.map(([lat, lng], i) => {
          const bendX = i % 2 === 0 ? 0.01 : -0.01;
          const bendY = i % 2 === 0 ? -0.01 : 0.01;
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
                className: 'terrain-polygon-blur',
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
});

// ─── Interaction & Labelling ─────────────────────────────────────────────────
function MountainLabelsLayer({ onMountainClick }: { onMountainClick: (loc: Location) => void }) {
  const { lang } = useLanguageStore();
  const { activeFilters } = useFilter();

  if (!activeFilters.mountain) return null;

  return (
    <>
      {mountainsGeometry.map((mt) => {
        const coords = mt.path;
        const centerIdx = Math.floor(coords.length / 2);
        const label = mt.title[lang] || mt.id;

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
              eventHandlers={{
                click: () => onMountainClick({
                  id: mt.id,
                  category: 'mountain',
                  name: mt.title,
                  latitude: mt.labelCoords[0],
                  longitude: mt.labelCoords[1],
                  description: "",
                } as unknown as Location)
              }}
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
              eventHandlers={{
                click: () => onMountainClick({
                  id: mt.id,
                  category: 'mountain',
                  name: mt.title,
                  latitude: mt.labelCoords[0],
                  longitude: mt.labelCoords[1],
                  description: "",
                } as unknown as Location)
              }}
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

const RiverLayer = React.memo(function RiverLayer({ onRiverClick }: { onRiverClick: (loc: Location) => void }) {
  const { lang } = useLanguageStore();
  const { activeFilters } = useFilter();
  const { selectedLocation } = useMap();

  if (!activeFilters.river) return null;

  const safeRivers = Array.isArray(riversGeometry) ? riversGeometry : [];

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
      {safeRivers.map((river) => {
        if (!river?.id) return null;
        const isSelected = selectedLocation?.id === river.id;
        const path = Array.isArray(river.path) ? river.path : [];
        if (path.length === 0) return null;

        const labelIdx = Math.floor(path.length * 0.4);
        const labelPoint = path[labelIdx] || path[0];
        const label = river.title?.[lang] || river.id;

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
                  name: river.title,
                  latitude: labelPoint[0],
                  longitude: labelPoint[1],
                  description: "",
                } as unknown as Location)
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
                  name: river.title,
                  latitude: labelPoint[0],
                  longitude: labelPoint[1],
                  description: "",
                } as unknown as Location)
              }}
              zIndexOffset={isSelected ? 100 : 30}
            />
          </React.Fragment>
        );
      })}
    </>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// SACRED CITIES LAYER (High-Priority Cultural Centers)
// ═══════════════════════════════════════════════════════════════════════════════

const POILayer = React.memo(({ onItemClick, locations }: { onItemClick: (loc: Location) => void; locations: Location[] }) => {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();
  const { lang } = useLanguageStore();

  const safeLocations = Array.isArray(locations) ? locations : [];

  const filteredLocations = useMemo(() =>
    safeLocations.filter(loc => loc?.category === 'city' && activeFilters.city),
    [safeLocations, activeFilters.city]);

  return (
    <>
      {filteredLocations.map((item) => {
        if (!item?.id) return null;
        const title = item?.name?.[lang] || item?.name?.en || item.id;
        const [lat, lng] = adjustCoords(item.id, item.latitude || 0, item.longitude || 0);
        const isSelected = selectedLocation?.id === item.id;

        return (
          <Marker
            key={`poi-${item.id}`}
            position={[lat, lng]}
            icon={createSacredMarker(isSelected)}
            eventHandlers={{
              click: () => onItemClick(item)
            }}
          >
            <Tooltip
              permanent
              direction="bottom"
              offset={[0, 6]}
              className="sacred-label"
              opacity={0.9}
            >
              {title}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
});

POILayer.displayName = 'POILayer';

function formatLabel(name: string) {
  if (name.includes("\n")) {
    const [primary, secondary] = name.split("\n");
    return `
      <div class="label-main" style="font-weight: 700 !important; text-shadow: none !important;">${primary.trim()}</div>
      <div class="label-sub" style="font-weight: 500 !important; text-shadow: none !important; opacity: 0.85;">${secondary.trim()}</div>
    `;
  }
  if (name.includes("(")) {
    const [primary, secondaryRaw] = name.split("(");
    const secondary = secondaryRaw.replace(")", "").trim();
    return `
      <div class="label-main" style="font-weight: 700 !important; text-shadow: none !important;">${primary.trim()}</div>
      <div class="label-sub" style="font-weight: 500 !important; text-shadow: none !important; opacity: 0.85;">${secondary}</div>
    `;
  }
  return `<div class="label-main" style="font-weight: 800 !important; text-shadow: none !important;">${name}</div>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC GEOGRAPHY LABELS (Countries & Oceans)
// ═══════════════════════════════════════════════════════════════════════════════

const OCEAN_LABELS = [
  {
    name: {
      en: "SINDHU SAGAR\n(ARABIAN SEA)",
      kn: "ಸಿಂಧು ಸಾಗರ\n(ಅರಬ್ಬಿ ಸಮುದ್ರ)",
      hi: "सिंधु सागर\n(अरब सागर)"
    },
    coords: [12.0, 64.5] as [number, number]
  },
  {
    name: {
      en: "HINDU MAHASAGAR\n(INDIAN OCEAN)",
      kn: "ಹಿಂದೂ ಮಹಾಸಾಗರ\n(ಇಂಡಿಯನ್ ಓಷನ್)",
      hi: "हिंद महासागर\n(इंडियन ओशन)"
    },
    coords: [1.5, 78.5] as [number, number]
  },
  {
    name: {
      en: "GANGA SAGAR\n(BAY OF BENGAL)",
      kn: "ಗಂಗಾ ಸಾಗರ\n(ಬಂಗಾಳ ಕೊಲ್ಲಿ)",
      hi: "गंगा सागर\n(बंगाल की खाड़ी)"
    },
    coords: [12.0, 88.5] as [number, number]
  }
];

function StaticLabelsLayer({ onRegionClick }: { onRegionClick: (loc: Location) => void }) {
  const { lang } = useLanguageStore();
  const { activeFilters } = useFilter();
  const labelWidth = 200;
  const labelHeight = 60;
  const oceanLabelWidth = 220;
  const oceanLabelHeight = 70;

  return (
    <>
      {activeFilters.region && COUNTRY_LABELS.map((item, idx) => (
        <Marker
          key={`country-${item.id}-${lang}`}
          position={item.coords}
          interactive={true}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="country-label country-label--clickable">${formatLabel(item.name[lang])}</div>`,
            iconSize: [labelWidth, labelHeight],
            iconAnchor: [labelWidth / 2, labelHeight / 2],
          })}
          eventHandlers={{
            click: (e) => {
              L.DomEvent.stopPropagation(e);
              onRegionClick({
                id: item.id,
                category: 'region',
                name: item.name,
                latitude: item.coords[0],
                longitude: item.coords[1],
                description: "",
              } as Location);
            }
          }}
        />
      ))}
      {OCEAN_LABELS.map((item, idx) => (
        <Marker
          key={`ocean-${idx}`}
          position={item.coords}
          interactive={false}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="ocean-label">${formatLabel(item.name[lang])}</div>`,
            iconSize: [oceanLabelWidth, oceanLabelHeight],
            iconAnchor: [oceanLabelWidth / 2, oceanLabelHeight / 2],
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
// FLY-TO-LOCATION VIEWPORT CONTROLLER
//
// Listens for selection changes (from search or sidebar) and pans map to item
// ═══════════════════════════════════════════════════════════════════════════════

function FlyToLocation() {
  const map = useLeafletMap();
  const { selectedLocation, setIsNavigating } = useMap();

  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      const zoom = getPreciseZoom(selectedLocation.category, selectedLocation.id);

      const handleMoveEnd = () => {
        setIsNavigating(false);
        map.off('zoomend', handleMoveEnd);
        map.off('moveend', handleMoveEnd);
      };

      map.on('zoomend', handleMoveEnd);
      map.on('moveend', handleMoveEnd);

      // Animation fallback: ensure UI isn't locked if Leaflet events don't fire
      const timeoutId = setTimeout(() => {
        setIsNavigating(false);
        map.off('zoomend', handleMoveEnd);
        map.off('moveend', handleMoveEnd);
      }, 2000); 

      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
        noMoveStart: true
      });

      return () => {
        clearTimeout(timeoutId);
        map.off('zoomend', handleMoveEnd);
        map.off('moveend', handleMoveEnd);
      };
    }
  }, [selectedLocation, map, setIsNavigating]);

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
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      map.setView([19.0, 80.0], 4, { animate: false });
    } else {
      map.fitBounds(REGION_BOUNDS, { padding: [0, 0], animate: false });
    }
    map.setMaxBounds(REGION_BOUNDS);
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
    let timeoutId: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        applyViewport();
      }, 150);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      clearTimeout(timeoutId);
    };
  }, [applyViewport]);

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CULTURAL MAP — Main Export
// ═══════════════════════════════════════════════════════════════════════════════

interface CulturalMapProps {
  onMarkerClick: (loc: Location) => void;
  onRegionClick?: (loc: Location) => void;
  locations: Location[];
}

export function CulturalMap({ onMarkerClick, onRegionClick, locations }: CulturalMapProps) {
  const [mapKey] = useState(() => `map-inst-${Math.random()}`);
  const [isMapMounted, setIsMapMounted] = useState(false);
  const [bordersData, setBordersData] = useState<any>(null);
  const [stateBorders, setStateBorders] = useState<any>(null);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const t = setTimeout(() => setIsMapMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch('/countries.geojson')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load countries');
        return r.json();
      })
      .then(setBordersData)
      .catch(() => { });
    fetch('/india_states.geojson')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load states');
        return r.json();
      })
      .then(setStateBorders)
      .catch(() => { });
  }, []);

  if (!isMapMounted) return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#080706' }} />
  );

  const safeLocations = Array.isArray(locations) ? locations : [];

  return (
    <MapContainer
      key={mapKey}
      center={MAP_CONFIG.CENTER}
      zoom={MAP_CONFIG.MIN_ZOOM}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
      zoomSnap={MAP_CONFIG.ZOOM_SNAP}
      zoomDelta={MAP_CONFIG.ZOOM_DELTA}
      maxBounds={REGION_BOUNDS}
      maxBoundsViscosity={MAP_CONFIG.MAX_BOUNDS_VISCOSITY}
      worldCopyJump={MAP_CONFIG.WORLD_COPY_JUMP}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', outline: 'none' }}
    >
      <ZoomControl position="topleft" />
      {/* Viewport controller fixes tilePane z-index before other components */}
      <MapViewController />
      <FlyToLocation />

      {/* ── Layer 1: Local Offline Base (No Network Tiles) ── */}
      <Pane name="basePane" style={{ zIndex: 100 }}>
        {/* Ocean Background */}
        <Rectangle
          bounds={[[-90, -180], [90, 180]]}
          pathOptions={{
            color: 'transparent',
            fillColor: '#3b5a78', // Medium archival blue
            fillOpacity: 1
          }}
          interactive={false}
        />
        {/* Landmass Fill */}
        {bordersData && (
          <GeoJSON
            data={bordersData}
            style={{
              color: 'transparent',
              fillColor: '#E8D5B5', // Parchment land color
              fillOpacity: 1
            }}
            interactive={false}
          />
        )}
      </Pane>

      {/* Parchment texture */}
      <ParchmentOverlay />

      {/* ── Layer 2: Terrain (glow + core line) ──────── */}
      <Pane name="terrainPane" style={{ zIndex: 200 }}>
        <MountainLinesLayer />
      </Pane>

      {/* ── Layer 2.5: Static Map Labels ──────── */}
      <Pane name="staticLabelsPane" style={{ zIndex: 850 }}>
        <StaticLabelsLayer onRegionClick={onRegionClick || onMarkerClick} />
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

      {/* ── Layer 6: Dynamic POIs (Temples & Cities) (highest z-order) ───────── */}
      <Pane name="poiPane" style={{ zIndex: 600 }}>
        <POILayer onItemClick={onMarkerClick} locations={locations} />
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
