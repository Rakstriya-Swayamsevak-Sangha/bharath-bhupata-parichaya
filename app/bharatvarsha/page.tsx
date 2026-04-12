'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Header } from '@/components/Header/Header';
import { Location } from '@/types/location';
import { citiesGeometry } from '@/data/citiesGeometry';
import { useLanguageStore } from '@/store/languageStore';

// Dynamic Imports for Bundle Optimization
const Search = dynamic(() => import('@/components/Search/Search').then(mod => mod.Search), { ssr: false });
const FilterBar = dynamic(() => import('@/components/FilterControls/FilterBar').then(mod => mod.FilterBar), { ssr: false });
const MobileFilters = dynamic(() => import('@/components/FilterControls/MobileFilters').then(mod => mod.MobileFilters), { ssr: false });
const KnowledgePanel = dynamic(() => import('@/components/KnowledgePanel/KnowledgePanel').then(mod => mod.KnowledgePanel), { ssr: false });
import { PageSkeleton } from './PageSkeleton';
import { AnimatePresence } from 'framer-motion';

const CulturalMap = dynamic<{
  onMarkerClick: (location: Location) => void;
  onRegionClick?: (location: Location) => void;
  locations: Location[];
}>(
  () =>
    import('@/components/Map/Map').then((mod) => mod.CulturalMap),
  {
    ssr: false,
    loading: () => null,
  }
);

import { motion } from 'framer-motion';

const easing: any = [0.16, 1, 0.3, 1];

function MapContent() {
  const { closeSidebar, setSelectedLocation, setIsNavigating, openSidebar } = useMap();
  const { lang } = useLanguageStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  useEffect(() => {
    async function loadData() {
      const startTime = Date.now();
      try {
        const [mountains, rivers] = await Promise.all([
          fetch('/data/mountains.json').then((r) => r.json()),
          fetch('/data/rivers.json').then((r) => r.json()),
        ]);

        const cityLocations: Location[] = citiesGeometry.map(city => ({
          id: city.id,
          name: city.name,
          category: 'city',
          latitude: city.coords[0],
          longitude: city.coords[1],
          description: "",
        }));

        setLocations([...mountains, ...rivers, ...cityLocations]);
      } catch (err) {
        setError('Failed to load location data');
        console.error(err);
      } finally {
        const elapsed = Date.now() - startTime;
        const minDisplayTime = 500;
        if (elapsed < minDisplayTime) {
          setTimeout(() => setIsLoading(false), minDisplayTime - elapsed);
        } else {
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, []);

  // Watch for navigation end to open KnowledgePanel punctually
  const { isNavigating, selectedLocation } = useMap();
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Open panel ONLY when navigation stops
    if (!isNavigating && selectedLocation) {
      if (selectedLocation.id !== lastSelectedId || !showKnowledge) {
        setLastSelectedId(selectedLocation.id);
        setShowKnowledge(true);
      }
    }
  }, [isNavigating, selectedLocation, lastSelectedId, showKnowledge]);

  const handleMarkerClick = useCallback(
    (location: Location) => {
      const isArchival = ['mountain', 'river', 'city', 'region'].includes(location.category);
      if (isArchival) {
        closeSidebar();
        setIsNavigating(true);
        setSelectedLocation(location);
        // setShowKnowledge(true) is now handled by the useEffect above
      } else {
        setShowKnowledge(false);
        openSidebar(location);
      }
    },
    [openSidebar, closeSidebar, setSelectedLocation, setIsNavigating]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[100dvh] bg-[#1C1A17] text-[#8B0000] gap-4">
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
      className="relative w-full h-[100dvh] bg-[#080706] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Header />

      <div className="relative flex-1 w-full overflow-hidden">
        {/* Map Canvas (Dominant Full-Bleed) */}
        <div className="absolute inset-0 z-10 transition-opacity duration-700 ease-in-out">
          <div className="w-full h-full">
            <CulturalMap
              onMarkerClick={handleMarkerClick}
              locations={locations}
            />
          </div>
        </div>

        <MobileFilters />

        {/* Knowledge Panel */}
        <KnowledgePanel onClose={() => {
          setSelectedLocation(null);
          setShowKnowledge(false);
          setLastSelectedId(null);
        }} />
      </div>

      {/* Skeleton Overlay - Full Page Coverage */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            <PageSkeleton />
          </motion.div>
        )}
      </AnimatePresence>
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
