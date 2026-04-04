'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap as useLeafletMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useMap } from '@/providers/MapContext';
import { useFilter } from '@/providers/FilterContext';
import { Location, Category } from '@/types/location';
import { MAP_CONFIG, AKHAND_BHARAT_BOUNDS } from '@/utils/constants';
import 'leaflet/dist/leaflet.css';

// ─── Marker Icons (pre-cached) ──────────────────────────────────────────────

const createIcon = (emoji: string, isSelected = false) =>
  L.divIcon({
    html: `<div style="
      font-size:24px;display:flex;align-items:center;justify-content:center;
      filter:${isSelected ? 'drop-shadow(0 0 6px #D4AF37)' : 'none'};
      transition:filter .2s ease;
    ">${emoji}</div>`,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const ICONS = {
  mountain: { normal: createIcon('🏔️'), selected: createIcon('🏔️', true) },
  river:    { normal: createIcon('🌊'), selected: createIcon('🌊', true) },
  temple:   { normal: createIcon('🛕'), selected: createIcon('🛕', true) },
};

const getIcon = (cat: Category, sel: boolean) =>
  sel ? ICONS[cat].selected : ICONS[cat].normal;

// ─── Marker Layer ───────────────────────────────────────────────────────────

interface MarkerLayerProps {
  locations: Location[];
  onMarkerClick: (loc: Location) => void;
}

function MarkerLayer({ locations, onMarkerClick }: MarkerLayerProps) {
  const { selectedLocation } = useMap();
  const { activeFilters } = useFilter();

  return (
    <>
      {locations
        .filter((loc) => activeFilters[loc.category])
        .map((loc) => {
          const sel = selectedLocation?.id === loc.id;
          return (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={getIcon(loc.category, sel)}
              eventHandlers={{ click: () => onMarkerClick(loc) }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold text-base mb-1">{loc.name}</h3>
                  {loc.nameHindi && (
                    <p className="text-sm opacity-80 mb-2">{loc.nameHindi}</p>
                  )}
                  <button
                    onClick={() => onMarkerClick(loc)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
}

// ─── Viewport Controller ─────────────────────────────────────────────────────
// Runs inside MapContainer. Sequence:
//   1. invalidateSize  — force correct container measurement
//   2. fitBounds        — fill viewport with Akhand Bharat bounds
//   3. setMaxBounds     — hard-lock panning

function MapViewController() {
  const map = useLeafletMap();
  const didInit = useRef(false);

  const applyViewport = () => {
    // Step 9: Force container size recalculation
    map.invalidateSize({ animate: false });

    // Step 3: Exact bounds fit — zero padding
    map.fitBounds(AKHAND_BHARAT_BOUNDS, {
      padding: [0, 0],
      animate: false,
    });

    // Step 4: Hard bounds lock
    map.setMaxBounds(AKHAND_BHARAT_BOUNDS);
    map.options.maxBoundsViscosity = MAP_CONFIG.MAX_BOUNDS_VISCOSITY;
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // Step 8: Zoom range
    map.options.minZoom = MAP_CONFIG.MIN_ZOOM;
    map.options.maxZoom = MAP_CONFIG.MAX_ZOOM;

    applyViewport();

    // Second pass — catches CSS paint race
    requestAnimationFrame(() => applyViewport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // Resize handler — keep bounds fitted after viewport changes
  useEffect(() => {
    const onResize = () => applyViewport();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}

// ─── CulturalMap ─────────────────────────────────────────────────────────────

interface CulturalMapProps {
  locations: Location[];
  onMarkerClick: (loc: Location) => void;
}

export function CulturalMap({ locations, onMarkerClick }: CulturalMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
        <span style={{ color: '#A0A0A0' }}>Loading map…</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={MAP_CONFIG.CENTER}
      zoom={MAP_CONFIG.MIN_ZOOM}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
      zoomSnap={MAP_CONFIG.ZOOM_SNAP}       /* Step 7 */
      zoomDelta={MAP_CONFIG.ZOOM_DELTA}     /* Step 7 */
      maxBounds={AKHAND_BHARAT_BOUNDS}      /* Step 4 */
      maxBoundsViscosity={MAP_CONFIG.MAX_BOUNDS_VISCOSITY}
      worldCopyJump={MAP_CONFIG.WORLD_COPY_JUMP}  /* Step 6 */
      zoomControl={true}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }}   /* Step 1 */
    >
      <TileLayer
        attribution={MAP_CONFIG.TILE_ATTRIBUTION}
        url={MAP_CONFIG.TILE_URL}
        noWrap={MAP_CONFIG.TILE_NO_WRAP}
        bounds={AKHAND_BHARAT_BOUNDS}
        keepBuffer={MAP_CONFIG.TILE_KEEP_BUFFER}
      />
      <MapViewController />
      <MarkerLayer locations={locations} onMarkerClick={onMarkerClick} />
    </MapContainer>
  );
}
