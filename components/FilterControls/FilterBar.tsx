'use client';

import React from 'react';
import { useFilter } from '@/providers/FilterContext';
import { useLanguageStore } from '@/store/languageStore';
import { Category } from '@/types/location';
import { UI_TEXT } from '@/data/uiText';
import { motion } from 'framer-motion';

interface FilterButtonProps {
  category: Category;
  isActive: boolean;
  onToggle: () => void;
}

function FilterButton({ category, isActive, onToggle }: FilterButtonProps) {
  const { lang } = useLanguageStore();
  let label = '';
  if (category === 'mountain') label = UI_TEXT.filterMountains[lang];
  else if (category === 'river') label = UI_TEXT.filterRivers[lang];
  else if (category === 'temple') label = UI_TEXT.filterSacredCities[lang];

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`filter ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
    >
      {label}
    </motion.button>
  );
}

export function FilterBar() {
  const { activeFilters, toggleFilter, setAllFilters } = useFilter();
  const { lang } = useLanguageStore();

  const allActive = activeFilters.mountain && activeFilters.river && activeFilters.temple;

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setAllFilters(true)}
        className={`filter ${allActive ? 'active' : ''}`}
      >
        {UI_TEXT.filterAll[lang]}
      </motion.button>

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
