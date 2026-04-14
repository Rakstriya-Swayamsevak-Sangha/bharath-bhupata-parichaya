'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Location } from '@/types/location';

interface MapContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  isFilterOpen: boolean;
  toggleFilterSidebar: () => void;
  isNavigating: boolean;
  setIsNavigating: (val: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (process.env.NODE_ENV === 'production') {
        event.preventDefault(); // Suppress browser console noise for users
      }
      console.error('[Global Resilience] Caught unhandled error:', event.error);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (process.env.NODE_ENV === 'production') {
        event.preventDefault();
      }
      console.error('[Global Resilience] Caught unhandled rejection:', event.reason);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);


  const toggleFilterSidebar = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        isFilterOpen,
        toggleFilterSidebar,
        isNavigating,
        setIsNavigating,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useMap must be used within a MapProvider. Returning safe mock for resilience.');
    }
    // Return a safe mock to prevent "cannot read property of undefined" crashes
    return {
      selectedLocation: null,
      setSelectedLocation: () => { },
      isFilterOpen: false,
      toggleFilterSidebar: () => { },
      isNavigating: false,
      setIsNavigating: () => { },
    };
  }
  return context;
}
