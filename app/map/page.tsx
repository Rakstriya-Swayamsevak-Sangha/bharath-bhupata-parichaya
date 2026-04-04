'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapProvider, useMap } from '@/providers/MapContext';
import { FilterProvider } from '@/providers/FilterContext';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { FilterBar } from '@/components/FilterControls/FilterBar';
import { Location } from '@/types/location';

// Dynamic import to avoid SSR issues with Leaflet
const CulturalMap = dynamic(
  () => import('@/components/Map/Map').then(mod => ({ default: mod.CulturalMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-textSecondary">Loading map...</div>
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
          fetch('/data/mountains.json').then(r => r.json()),
          fetch('/data/rivers.json').then(r => r.json()),
          fetch('/data/temples.json').then(r => r.json()),
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

  const handleMarkerClick = useCallback((location: Location) => {
    openSidebar(location);
  }, [openSidebar]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-surface border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div>
            <h1 className="font-cinzel text-2xl font-semibold text-textPrimary">
              अखंड भारत दर्शन
            </h1>
            <p className="text-textSecondary text-sm mt-0.5">
              Akhand Bharat Cultural Map
            </p>
          </div>
          <div className="text-right">
            <span className="text-textSecondary text-xs">
              {locations.length} sacred sites
            </span>
          </div>
        </div>
      </header>

      {/* Filter Controls */}
      <div className="flex-shrink-0 p-4">
        <div className="max-w-screen-2xl mx-auto">
          <FilterBar />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative min-h-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <div className="text-textSecondary">Loading locations...</div>
          </div>
        ) : (
          <CulturalMap locations={locations} onMarkerClick={handleMarkerClick} />
        )}
      </div>

      {/* Sidebar */}
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
