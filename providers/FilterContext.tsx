'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Category } from '@/types/location';

interface FilterContextType {
  activeFilters: Record<Category, boolean>;
  toggleFilter: (category: Category) => void;
  isFilterActive: (category: Category) => boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const DEFAULT_FILTERS: Record<Category, boolean> = {
  mountain: true,
  river: true,
  city: true,
  region: true,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<Record<Category, boolean>>(DEFAULT_FILTERS);

  const toggleFilter = useCallback((category: Category) => {
    setActiveFilters(prev => {
      const isAllActive = Object.values(prev).every(v => v);
      
      if (isAllActive) {
        return {
          mountain: category === 'mountain',
          river: category === 'river',
          city: category === 'city',
          region: category === 'region',
        };
      }
      
      const next = {
        ...prev,
        [category]: !prev[category],
      };

      // Ensure at least one filter remains active
      if (Object.values(next).every(v => !v)) {
        return DEFAULT_FILTERS;
      }
      
      return next;
    });
  }, []);

  const isFilterActive = useCallback(
    (category: Category) => activeFilters[category],
    [activeFilters]
  );

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        toggleFilter,
        isFilterActive,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useFilter must be used within a FilterProvider. Returning safe mock.');
    }
    return {
      activeFilters: DEFAULT_FILTERS,
      toggleFilter: () => {},
      isFilterActive: (cat: Category) => DEFAULT_FILTERS[cat],
    };
  }
  return context;
}
