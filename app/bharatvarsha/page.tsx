'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Header } from '@/components/Header/Header';
import { Location } from '@/types/location';
import { citiesGeometry } from '@/data/citiesGeometry';
import { useLanguageStore } from '@/store/languageStore';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { useNetwork } from '@/hooks/useNetwork';
import { getAssetPath } from '@/data/imageManifest';

// Use ssr:false and loading to prevent SSR issues
const Search = dynamic(() => import('@/components/Search/Search').then(mod => mod.Search), { ssr: false, loading: () => null });
const MobileFilters = dynamic(() => import('@/components/FilterControls/MobileFilters').then(mod => mod.MobileFilters), { ssr: false, loading: () => null });
const KnowledgePanel = dynamic(() => import('@/components/KnowledgePanel/KnowledgePanel').then(mod => mod.KnowledgePanel), { ssr: false, loading: () => null });
const CulturalMap = dynamic(() => import('@/components/Map/Map').then(mod => mod.CulturalMap), { ssr: false, loading: () => null });

import { PageSkeleton } from './PageSkeleton';
import { AnimatePresence, motion } from 'framer-motion';

const easing: any = [0.16, 1, 0.3, 1];

function MapContent() {
  const { setSelectedLocation, setIsNavigating } = useMap();
  const { lang } = useLanguageStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  useEffect(() => {
    async function loadData() {
      const startTime = Date.now();
      try {
        const [mountains, rivers] = await Promise.all([
          fetch('/data/mountains.json').then((r) => {
            if (!r.ok) throw new Error('Failed to load mountains');
            return r.json();
          }).catch(() => []),
          fetch('/data/rivers.json').then((r) => {
            if (!r.ok) throw new Error('Failed to load rivers');
            return r.json();
          }).catch(() => []),
        ]);

        const cityLocations: Location[] = citiesGeometry.map(city => ({
          id: city.id,
          name: city.name,
          category: 'city' as const,
          latitude: city.coords[0] ?? 0,
          longitude: city.coords[1] ?? 0,
          description: "",
        }));

        const mountainLocations: Location[] = (mountains || []).map((mt: any) => ({
          id: mt.id ?? '',
          name: typeof mt.name === 'object' ? mt.name : { en: mt.name || mt.id, kn: mt.name || mt.id, hi: mt.name || mt.id },
          category: 'mountain' as const,
          latitude: mt.latitude ?? 0,
          longitude: mt.longitude ?? 0,
          description: mt.description || "",
        }));

        const riverLocations: Location[] = (rivers || []).map((rv: any) => ({
          id: rv.id ?? '',
          name: typeof rv.name === 'object' ? rv.name : { en: rv.name || rv.id, kn: rv.name || rv.id, hi: rv.name || rv.id },
          category: 'river' as const,
          latitude: rv.latitude ?? 0,
          longitude: rv.longitude ?? 0,
          description: rv.description || "",
        }));

        setLocations([...mountainLocations, ...riverLocations, ...cityLocations]);
      } catch (err) {
        setLoadError('Unable to load map data');
        setLocations(citiesGeometry.map(city => ({
          id: city.id,
          name: city.name,
          category: 'city' as const,
          latitude: city.coords[0] ?? 0,
          longitude: city.coords[1] ?? 0,
          description: "",
        })));
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
      if (!location?.id) return;
      
      setIsNavigating(true);
      setSelectedLocation(location);

      const id = location.id;
      const assetPath = getAssetPath(id);

      import('@/components/PWA/PreloadSystem').then(mod => {
        if (mod?.cacheInteractionAssets) {
          mod.cacheInteractionAssets([assetPath]);
        }
      }).catch(() => {});
    },
    [setSelectedLocation, setIsNavigating]
  );

  if (loadError && !locations.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[100dvh] bg-[#1C1A17] text-[#8B7355] gap-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <span style={{ fontFamily: "'Cinzel', serif" }}>{loadError}</span>
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

      <div className="main-content-area">

        {/* Map Canvas (Dominant Full-Bleed) */}
        <div className="map-canvas-container map-canvas-container-desktop">
          <div className="map-layer transition-opacity duration-700 ease-in-out">
            <ErrorBoundary componentName="Map">
              <CulturalMap
                onMarkerClick={handleMarkerClick}
                locations={locations}
              />
            </ErrorBoundary>
          </div>

          <ErrorBoundary componentName="MobileFilters">
            <MobileFilters />
          </ErrorBoundary>

          {/* Knowledge Panel */}
          <ErrorBoundary componentName="Knowledge Panel">
            <KnowledgePanel onClose={() => {
              setSelectedLocation(null);
              setShowKnowledge(false);
              setLastSelectedId(null);
            }} />
          </ErrorBoundary>
        </div>
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

export default function BharatvarshaPage() {
  return (
    <MapProvider>
      <FilterProvider>
        <MapContent />
      </FilterProvider>
    </MapProvider>
  );
}
