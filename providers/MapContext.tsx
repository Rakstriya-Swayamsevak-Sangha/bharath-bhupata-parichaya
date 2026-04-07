'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Location } from '@/types/location';

interface MapContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  isSidebarOpen: boolean;
  openSidebar: (location: Location) => void;
  closeSidebar: () => void;
  isFilterOpen: boolean;
  toggleFilterSidebar: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const openSidebar = useCallback((location: Location) => {
    setSelectedLocation(location);
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleFilterSidebar = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isFilterOpen,
        toggleFilterSidebar,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
