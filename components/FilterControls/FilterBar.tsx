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
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-medium transition-all duration-200
        border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        ${isActive
          ? 'text-white border-transparent'
          : 'text-textSecondary border-border hover:border-textSecondary'
        }
      `}
      style={isActive ? { backgroundColor: config.color } : undefined}
      aria-pressed={isActive}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </button>
  );
}

export function FilterBar() {
  const { activeFilters, toggleFilter, setAllFilters } = useFilter();

  const allActive = activeFilters.mountain && activeFilters.river && activeFilters.temple;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-surface/80 backdrop-blur-sm rounded-xl border border-border">
      <span className="text-textSecondary text-xs uppercase tracking-wider mr-2">
        Filter:
      </span>

      <button
        onClick={() => setAllFilters(!allActive)}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full
          text-sm font-medium transition-all duration-200
          border focus:outline-none focus:ring-2 focus:ring-primary
          ${allActive
            ? 'bg-secondary text-background border-transparent'
            : 'text-textSecondary border-border hover:border-textSecondary'
          }
        `}
      >
        All
      </button>

      <div className="flex items-center gap-2">
        {(['mountain', 'river', 'temple'] as Category[]).map(category => (
          <FilterButton
            key={category}
            category={category}
            isActive={activeFilters[category]}
            onToggle={() => toggleFilter(category)}
          />
        ))}
      </div>
    </div>
  );
}
