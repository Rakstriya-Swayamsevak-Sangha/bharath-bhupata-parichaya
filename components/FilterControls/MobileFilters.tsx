'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFilter } from '@/providers/FilterContext';
import { useLanguageStore } from '@/store/languageStore';
import { Category } from '@/types/location';
import { UI_TEXT } from '@/data/uiText';

function MobileFilterButton({ category, isActive, onToggle }: { category: Category, isActive: boolean, onToggle: () => void }) {
  const { lang } = useLanguageStore();
  let label = '';
  if (category === 'mountain') label = UI_TEXT.filterMountains[lang];
  else if (category === 'river') label = UI_TEXT.filterRivers[lang];
  else if (category === 'city') label = UI_TEXT.filterSacredCities[lang];
  
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`mobile-filter-btn ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
    >
      <span className="filter-label">{label}</span>
    </motion.button>
  );
}

export function MobileFilters() {
  const { activeFilters, toggleFilter, setAllFilters } = useFilter();
  const { lang } = useLanguageStore();
  
  const allActive = activeFilters.mountain && activeFilters.river && activeFilters.city;

  return (
    <div className="mobile-filters-bar">
      <div className="mobile-filters-scroll">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setAllFilters(!allActive)}
          className={`mobile-filter-btn ${allActive ? 'active' : ''}`}
        >
          <span className="filter-label">{UI_TEXT.filterAll[lang]}</span>
        </motion.button>

        {(['mountain', 'river', 'city'] as Category[]).map(category => (
          <MobileFilterButton
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
