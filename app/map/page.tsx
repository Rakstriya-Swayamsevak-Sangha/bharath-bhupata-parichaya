'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { FilterBar } from '@/components/FilterControls/FilterBar';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { KnowledgePanel } from '@/components/KnowledgePanel/KnowledgePanel';
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
  const { openSidebar, setSelectedLocation } = useMap();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

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
      if (location.category === 'mountain') {
        setSelectedLocation(location);
        setShowKnowledge(true);
      } else {
        openSidebar(location);
        setShowKnowledge(false);
      }
    },
    [openSidebar, setSelectedLocation]
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
      {/* ── Header (Minimal) ───────────────────────── */}
      <header className="header shrink-0 relative z-20">
        <h1 className="title">
          Akhand Bharat Darshan
        </h1>
        <LanguageSwitcher />
      </header>

      {/* ── Cultural Intro Strip ───────────────────── */}
      <div className="intro shrink-0 relative z-10">
        <p>
          Explore the sacred geography of Bharat — rivers, mountains, and ancient cities that shaped civilization.
        </p>
      </div>

      {/* ── Main Layout (Sidebar + Map) ────────────── */}
      <div className="mainLayout flex-1 w-full relative z-0">
        
        {/* ── Left Sidebar ─────────────────────────── */}
        <div className="sidebar shrink-0">
          <h3>Explore</h3>
          
          <FilterBar />

          <div className="flex-1"></div>

          <div className="count">
            {locations.length} Sacred Sites
          </div>
        </div>

        {/* ── Map Container Overlay ────────────────── */}
        <div className="map-container relative">
          <div className="map-frame">
            {isLoading ? (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'transparent', gap: '14px',
              }}>
                <div className="map-loading-spinner" style={{ borderColor: 'rgba(207,174,123,0.3)', borderTopColor: '#CFAE7B' }} />
                <span style={{ color: '#8B5E34', fontFamily: "'Cinzel', serif", fontSize: '13px', letterSpacing: '0.1em' }}>
                  Discovering sacred sites…
                </span>
              </div>
            ) : (
              <CulturalMap
                onMarkerClick={handleMarkerClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Sidebar (overlay) ──────────────────────────────────────────── */}
      <Sidebar />

      {/* ── Knowledge Panel (Mountain specific archival sheet) ─────────── */}
      <KnowledgePanel onClose={() => {
        setSelectedLocation(null); // Fix: use setSelectedLocation to deselect
        setShowKnowledge(false);
      }} />
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
