'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { search, SearchResult } from '@/utils/search';
import { motion, AnimatePresence } from 'framer-motion';
import { UI_TEXT } from '@/data/uiText';
import { citiesGeometry } from '@/data/citiesGeometry';
import { mountainsGeometry } from '@/data/mountainsGeometry';
import { riversGeometry } from '@/data/riversGeometry';
import { COUNTRY_LABELS } from '@/data/regionsGeometry';
import { adjustCoords } from '@/utils/geo';
import { Location } from '@/types/location';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { setSelectedLocation, setIsNavigating } = useMap();
  const { lang } = useLanguageStore();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const found = search(query, lang);
        setResults(found);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
      setSelectedIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, lang]);

  const handleSelect = useCallback((item: SearchResult) => {
    let lat = 0;
    let lng = 0;

    if (item.type === 'city') {
      const city = citiesGeometry.find(c => c.id === item.id);
      if (city) {
        const [aLat, aLng] = adjustCoords(city.id, city.coords[0], city.coords[1]);
        lat = aLat;
        lng = aLng;
      }
    } else if (item.type === 'mountain') {
      const mt = mountainsGeometry.find(m => m.id === item.id);
      if (mt) {
        const mid = Math.floor(mt.path.length / 2);
        lat = mt.path[mid][0];
        lng = mt.path[mid][1];
      }
    } else if (item.type === 'river') {
      const rv = riversGeometry.find(r => r.id === item.id);
      if (rv) {
        const idx = Math.floor(rv.path.length * 0.4);
        lat = rv.path[idx][0];
        lng = rv.path[idx][1];
      }
    } else if (item.type === 'region') {
      const reg = COUNTRY_LABELS.find(r => r.id === item.id);
      if (reg) {
        lat = reg.coords[0];
        lng = reg.coords[1];
      }
    }

    const location: Location = {
      id: item.id,
      name: item.title,
      category: item.type as any,
      latitude: lat,
      longitude: lng,
      description: '', 
    } as unknown as Location;

    // Trigger map move ritual ONLY
    setIsNavigating(true);
    setSelectedLocation(location);
    setIsOpen(false);
    setQuery('');
  }, [setSelectedLocation, setIsNavigating]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="search-system" ref={searchRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          id="cultural-search"
          name="cultural-search"
          type="text"
          placeholder={UI_TEXT.searchPlaceholder[lang]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="search-dropdown"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: index * 0.025, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(result)}
               >
                <div className="result-info">
                  <span className="result-title">{result.title[lang]}</span>
                  {lang !== 'en' && <span className="result-subtitle">{result.title.en}</span>}
                </div>
                <span className={`result-badge badge-${result.type}`}>
                  {result.type === 'mountain' ? UI_TEXT.filterMountains[lang] : 
                   result.type === 'river' ? UI_TEXT.filterRivers[lang] : 
                   result.type === 'region' ? UI_TEXT.filterRegions[lang] :
                   UI_TEXT.filterSacredCities[lang]}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
