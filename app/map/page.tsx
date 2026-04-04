'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { FilterBar } from '@/components/FilterControls/FilterBar';
import { Location } from '@/types/location';

// Dynamic import — Leaflet requires browser APIs
const CulturalMap = dynamic(
  () =>
    import('@/components/Map/Map').then((mod) => ({
      default: mod.CulturalMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div style={{ color: '#A0A0A0' }}>Loading map…</div>
      </div>
    ),
  }
);

function MapContent() {
  const { openSidebar } = useMap();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [mountains, rivers, temples] = await Promise.all([
          fetch('/data/mountains.json').then((r) => r.json()),
          fetch('/data/rivers.json').then((r) => r.json()),
          fetch('/data/temples.json').then((r) => r.json()),
        ]);
        setLocations([...mountains, ...rivers, ...temples]);
      } catch (err) {
        setError('Failed to load location data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkerClick = useCallback(
    (location: Location) => {
      openSidebar(location);
    },
    [openSidebar]
  );

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#ef4444',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      id="map-shell"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        style={{
          flexShrink: 0,
          backgroundColor: '#252525',
          borderBottom: '1px solid #333333',
          padding: '12px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#F5F5F5',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              अखंड भारत दर्शन
            </h1>
            <p
              style={{
                color: '#A0A0A0',
                fontSize: '0.8rem',
                margin: '2px 0 0 0',
              }}
            >
              Akhand Bharat Cultural Map
            </p>
          </div>
          <div>
            <span style={{ color: '#A0A0A0', fontSize: '0.75rem' }}>
              {locations.length} sacred sites
            </span>
          </div>
        </div>
      </header>

      {/* ── Filter Controls ────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          padding: '8px 20px',
        }}
      >
        <FilterBar />
      </div>

      {/* ── Map Viewport ───────────────────────────────────────────────── */}
      {/* flex: 1 + minHeight: 0 ensures the map fills ALL remaining space */}
      <div
        id="map-viewport"
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          width: '100%',
        }}
      >
        {isLoading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1a1a1a',
              color: '#A0A0A0',
            }}
          >
            Loading locations…
          </div>
        ) : (
          <CulturalMap
            locations={locations}
            onMarkerClick={handleMarkerClick}
          />
        )}
      </div>

      {/* ── Sidebar (overlay) ──────────────────────────────────────────── */}
      <Sidebar />
    </div>
  );
}

export default function MapPage() {
  return (
    <MapProvider>
      <FilterProvider>
        <MapContent />
      </FilterProvider>
    </MapProvider>
  );
}
