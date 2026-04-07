'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Category } from '@/types/location';

interface FilterContextType {
  activeFilters: Record<Category, boolean>;
  toggleFilter: (category: Category) => void;
  setAllFilters: (active: boolean) => void;
  isFilterActive: (category: Category) => boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const DEFAULT_FILTERS: Record<Category, boolean> = {
  mountain: true,
  river: true,
  city: true,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<Record<Category, boolean>>(DEFAULT_FILTERS);

  const toggleFilter = useCallback((category: Category) => {
    setActiveFilters(prev => {
      const isAllActive = prev.mountain && prev.river && prev.city;
      
      if (isAllActive) {
        return {
          mountain: category === 'mountain',
          river: category === 'river',
          city: category === 'city',
        };
      }
      
      const next = {
        ...prev,
        [category]: !prev[category],
      };

      // Ensure at least one filter remains active
      if (!next.mountain && !next.river && !next.city) {
        return { mountain: true, river: true, city: true };
      }
      
      return next;
    });
  }, []);

  const setAllFilters = useCallback((active: boolean) => {
    setActiveFilters({
      mountain: active,
      river: active,
      city: active,
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
        setAllFilters,
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
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
