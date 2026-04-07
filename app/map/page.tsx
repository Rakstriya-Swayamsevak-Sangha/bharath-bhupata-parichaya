'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { Location } from '@/types/location';
import { citiesGeometry } from '@/data/citiesGeometry';
import { useLanguageStore } from '@/store/languageStore';
import { UI_TEXT } from '@/data/uiText';

// Dynamic Imports for Bundle Optimization
const Search = dynamic(() => import('@/components/Search/Search').then(mod => mod.Search), { ssr: false });
const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar').then(mod => mod.Sidebar), { ssr: false });
const FilterBar = dynamic(() => import('@/components/FilterControls/FilterBar').then(mod => mod.FilterBar), { ssr: false });
const MobileFilters = dynamic(() => import('@/components/FilterControls/MobileFilters').then(mod => mod.MobileFilters), { ssr: false });
const KnowledgePanel = dynamic(() => import('@/components/KnowledgePanel/KnowledgePanel').then(mod => mod.KnowledgePanel), { ssr: false });

const CulturalMap = dynamic<{
  onMarkerClick: (location: Location) => void;
  locations: Location[];
}>(
  () =>
    import('@/components/Map/Map').then((mod) => mod.CulturalMap),
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

import { motion } from 'framer-motion';

function MapContent() {
  const { openSidebar, closeSidebar, setSelectedLocation, isFilterOpen, toggleFilterSidebar } = useMap();
  const { lang } = useLanguageStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [mountains, rivers] = await Promise.all([
          fetch('/data/mountains.json').then((r) => r.json()),
          fetch('/data/rivers.json').then((r) => r.json()),
        ]);

        // Use Sacred Cities as our primary POI dataset
        const cityLocations: Location[] = citiesGeometry.map(city => ({
          id: city.id,
          name: city.name,
          category: 'city',
          latitude: city.coords[0],
          longitude: city.coords[1],
          description: "", // Fetched from cityKnowledge in KnowledgePanel
        }));

        setLocations([...mountains, ...rivers, ...cityLocations]);
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
      const isArchival = ['mountain', 'river', 'city', 'temple'].includes(location.category);
      if (isArchival) {
        closeSidebar();
        setSelectedLocation(location);
        setShowKnowledge(true);
      } else {
        setShowKnowledge(false);
        openSidebar(location);
      }
    },
    [openSidebar, closeSidebar, setSelectedLocation]
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
        <div className="header-container">
          <h1 className="title">
            {UI_TEXT.headerTitle[lang]}
          </h1>
          <div className="header-actions">
            <Search />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* ── Cultural Intro Strip ───────────────────── */}
      <div className="intro shrink-0 relative z-10">
        <p>
          {UI_TEXT.introText[lang]}
        </p>
      </div>

      {/* ── Main Layout (Sidebar + Map) ────────────── */}
      <div className="mainLayout flex-1 w-full relative z-0 flex overflow-hidden">

        {/* ── Left Sidebar ─────────────────────────── */}
        <motion.div
          initial={false}
          animate={{
            width: isFilterOpen ? '260px' : '0px',
            opacity: isFilterOpen ? 1 : 0,
            x: isFilterOpen ? 0 : -20
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onAnimationComplete={() => {
            // Force Leaflet to recalculate size after sidebar transition
            window.dispatchEvent(new Event('resize'));
          }}
          className="sidebar shrink-0 overflow-hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: isFilterOpen ? '1px solid var(--color-border)' : 'none'
          }}
        >
          <div className="p-4 w-[260px]">
            <h3 style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, marginBottom: '16px' }}>
              {UI_TEXT.explore[lang]}
            </h3>

            <FilterBar />
          </div>
        </motion.div>

        {/* ── Sidebar Toggle Button ────────────────── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleFilterSidebar}
          className="sidebar-toggle-modern hide-on-mobile"
          initial={false}
          animate={{ left: isFilterOpen ? '248px' : '10px' }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '20px',
            zIndex: 100,
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#2A2520',
            border: '1px solid #3D352D',
            color: '#FF9933',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            padding: 0
          }}
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"

            animate={{ rotate: isFilterOpen ? 0 : 180 }}
          >
            <path d="M15 18l-6-6 6-6" />
          </motion.svg>
        </motion.button>

        {/* ── Map Container Overlay ────────────────── */}
        <div className="map-container relative flex-1">
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
                  {UI_TEXT.discoveringSites[lang]}
                </span>
              </div>
            ) : (
              <CulturalMap
                onMarkerClick={handleMarkerClick}
                locations={locations}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Sidebar (overlay) ──────────────────────────────────────────── */}
      <Sidebar />

      {/* ── Mobile Filter Pill ── */}
      <MobileFilters />

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
