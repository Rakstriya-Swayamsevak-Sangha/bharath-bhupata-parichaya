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
        inline-flex items-center gap-2 px-4 py-2 rounded-sm
        text-xs font-medium transition-all duration-200
        border focus:outline-none
        ${isActive
          ? 'text-textPrimary border-transparent'
          : 'text-textSecondary border-border hover:border-accent/40 hover:text-accent'
        }
      `}
      style={isActive ? {
        backgroundColor: config.markerBg,
        borderColor: config.color,
      } : undefined}
      aria-pressed={isActive}
    >
      <span style={{
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontSize: '10px',
      }}>
        {config.label}
      </span>
      <span style={{
        fontSize: '9px',
        color: isActive ? 'rgba(240,230,211,0.5)' : 'rgba(168,152,130,0.5)',
      }}>
        {config.labelEn}
      </span>
    </button>
  );
}

export function FilterBar() {
  const { activeFilters, toggleFilter, setAllFilters } = useFilter();

  const allActive = activeFilters.mountain && activeFilters.river && activeFilters.temple;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-surface/80 backdrop-blur-sm rounded-sm border border-border">
      <span
        className="text-textSecondary mr-2"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        दर्शन :
      </span>

      <button
        onClick={() => setAllFilters(!allActive)}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-sm
          text-xs font-medium transition-all duration-200
          border focus:outline-none
          ${allActive
            ? 'bg-primary/15 text-primary border-primary/30'
            : 'text-textSecondary border-border hover:border-accent/40 hover:text-accent'
          }
        `}
        style={{
          fontFamily: "'Cinzel', serif",
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontSize: '10px',
        }}
      >
        All
      </button>

      <div className="flex items-center gap-1.5">
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
