'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Header } from '@/components/Header/Header';
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

const easing: any = [0.16, 1, 0.3, 1];

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
      const isArchival = ['mountain', 'river', 'city'].includes(location.category);
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
    <motion.main 
      className="relative w-full h-screen bg-[#080706] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Header />

      <div className="map-wrapper flex-1">
        {/* Map Canvas (Dominant) */}
        <div className="map-canvas-container">
          <div className="w-full h-full relative">
            {!isLoading && (
              <CulturalMap
                onMarkerClick={handleMarkerClick}
                locations={locations}
              />
            )}
          </div>
        </div>

        {/* Filters (Bottom Overlay) */}
        <MobileFilters />

        {/* Knowledge Panel */}
        <KnowledgePanel onClose={() => {
          setSelectedLocation(null);
          setShowKnowledge(false);
        }} />
      </div>

      <Sidebar />
    </motion.main>
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
