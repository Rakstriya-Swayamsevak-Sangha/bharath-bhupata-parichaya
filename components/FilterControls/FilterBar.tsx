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
  else if (category === 'city') label = UI_TEXT.filterSacredCities[lang];
  else if (category === 'region') label = UI_TEXT.filterRegions[lang];
  else if (category === 'mahapurusha') label = UI_TEXT.filterMahapurushas[lang];

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
  const { activeFilters, toggleFilter } = useFilter();
  const { lang } = useLanguageStore();

  return (
    <>
      {(['region', 'mahapurusha', 'mountain', 'river', 'city'] as Category[]).map(category => (
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
