'use client';

import React from 'react';
import { useFilter } from '@/providers/FilterContext';
import { Category } from '@/types/location';
import { CATEGORY_CONFIG } from '@/utils/constants';

interface FilterButtonProps {
  category: Category;
  isActive: boolean;
  onToggle: () => void;
}

function FilterButton({ category, isActive, onToggle }: FilterButtonProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <button
      onClick={onToggle}
      className={`filter ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
    >
      {config.labelEn}
    </button>
  );
}

export function FilterBar() {
  const { activeFilters, toggleFilter, setAllFilters } = useFilter();

  const allActive = activeFilters.mountain && activeFilters.river && activeFilters.temple;

  return (
    <>
      <button
        onClick={() => setAllFilters(true)}
        className={`filter ${allActive ? 'active' : ''}`}
      >
        All
      </button>

      {(['mountain', 'river', 'temple'] as Category[]).map(category => (
        <FilterButton
          key={category}
          category={category}
          isActive={activeFilters[category]}
          onToggle={() => toggleFilter(category)}
        />
      ))}
    </>
  );
}
