'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { FilterBar } from '@/components/FilterControls/FilterBar';
import { Location } from '@/types/location';

const CulturalMap = dynamic(
  () =>
    import('@/components/Map/Map').then((mod) => ({
      default: mod.CulturalMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#1C1A17', gap: '14px',
      }}>
        <div className="map-loading-spinner" />
        <span style={{ color: '#A89882', fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '0.1em' }}>
          Preparing atlas…
        </span>
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
      <div style={{
        width: '100%', height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#1C1A17', color: '#8B0000', gap: '12px',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <span style={{ fontFamily: "'Cinzel', serif" }}>{error}</span>
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
        backgroundColor: '#1C1A17',
        overflow: 'hidden',
      }}
    >
      {/* ── Header — Ancient Manuscript Banner ───────────────────────── */}
      <header
        style={{
          flexShrink: 0,
          background: 'linear-gradient(180deg, #2A2520 0%, #231F1B 100%)',
          borderBottom: '1px solid #3D352D',
          padding: '14px 24px',
          zIndex: 20,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#FF9933',
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '0.02em',
            }}>
              अखंड भारत दर्शन
            </h1>
            <p style={{
              fontFamily: "'Cinzel', serif",
              color: '#A89882',
              fontSize: '0.7rem',
              margin: '4px 0 0 0',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Cultural Atlas of Akhand Bharat
            </p>
          </div>

          {/* Sacred sites counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '2px',
            background: 'rgba(255, 153, 51, 0.08)',
            border: '1px solid rgba(255, 153, 51, 0.2)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{
              fontFamily: "'Cinzel', serif",
              color: '#FF9933',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}>
              {locations.length} Sacred Sites
            </span>
          </div>
        </div>
      </header>

      {/* ── Filter Controls ────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        padding: '8px 24px',
        background: 'rgba(28, 26, 23, 0.9)',
        zIndex: 15,
      }}>
        <FilterBar />
      </div>

      {/* ── Map Viewport (with vignette) ───────────────────────────────── */}
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
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#1C1A17', gap: '14px',
          }}>
            <div className="map-loading-spinner" />
            <span style={{ color: '#A89882', fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '0.1em' }}>
              Discovering sacred sites…
            </span>
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
