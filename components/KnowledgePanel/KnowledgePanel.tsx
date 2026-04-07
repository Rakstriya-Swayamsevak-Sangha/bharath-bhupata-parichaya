'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { mountainKnowledge } from '@/data/mountainKnowledge';
import { riverKnowledge } from '@/data/riverKnowledge';
import { cityKnowledge } from '@/data/cityKnowledge';
import { UI_TEXT } from '@/data/uiText';

interface KnowledgePanelProps {
  onClose: () => void;
}

export function KnowledgePanel({ onClose }: KnowledgePanelProps) {
  const { selectedLocation } = useMap();
  const { lang, setLang } = useLanguageStore();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [sheetMode, setSheetMode] = useState<'collapsed' | 'half' | 'full'>('full');
  const [localLocation, setLocalLocation] = useState(selectedLocation);

  const factLabels: Record<string, Record<string, string>> = {
    en: {
      length: 'Length',
      highestPeak: 'Highest Peak',
      highest_peak: 'Highest Peak',
      extent: 'Extent',
      elevation: 'Elevation',
      altitude: 'Altitude',
      origin: 'Origin',
      mouth: 'Mouth',
      confluence: 'Confluence',
      tributaries: 'Tributaries'
    },
    kn: {
      length: 'ಉದ್ದ',
      highestPeak: 'ಅತಿಎತ್ತರದ ಶಿಖರ',
      highest_peak: 'ಅತಿಎತ್ತರದ ಶಿಖರ',
      extent: 'ವಿಸ್ತರಣೆ',
      elevation: 'ಎತ್ತರ',
      altitude: 'ಎತ್ತರ',
      origin: 'ಉಗಮ',
      mouth: 'ಸಂಗಮ',
      confluence: 'ಸಂಗಮ',
      tributaries: 'ಉಪನದಿಗಳು'
    },
    hi: {
      length: 'लंबाई',
      highestPeak: 'सर्वोच्च शिखर',
      highest_peak: 'सर्वोच्च शिखर',
      extent: 'विस्तार',
      elevation: 'ऊंचाई',
      altitude: 'ऊंचाई',
      origin: 'उद्गम',
      mouth: 'मुहाना',
      confluence: 'संगम',
      tributaries: 'सहायक नदियां'
    },
  };

  useEffect(() => {
    if (selectedLocation?.category === 'mountain' || selectedLocation?.category === 'river' || selectedLocation?.category === 'city') {
      const isMobile = window.innerWidth < 768;
      setLocalLocation(selectedLocation);

      if (selectedLocation.noAutoOpen && isMobile) {
        setIsVisible(false);
        return;
      }

      setSheetMode('half'); // Start at half on mobile for peek view
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [selectedLocation]);

  if (!localLocation) return null;
  if (localLocation.category !== 'mountain' && localLocation.category !== 'river' && localLocation.category !== 'city') return null;

  const isRiver = localLocation.category === 'river';
  const isCity = localLocation.category === 'city';

  let knowledge: any = null;
  if (isRiver) knowledge = riverKnowledge[localLocation.id];
  else if (isCity) knowledge = cityKnowledge[localLocation.id];
  else if (localLocation.category === 'mountain') knowledge = mountainKnowledge[localLocation.id];
  
  // Dynamic fallback for items not in static database (like temples.json)
  if (!knowledge) {
    knowledge = {
      ...localLocation,
      title: localLocation.name,
      description: { en: localLocation.description, kn: localLocation.description, hi: localLocation.description },
      facts: localLocation.metadata || {},
      cultural: { en: localLocation.historicalSignificance || "", kn: localLocation.historicalSignificance || "", hi: localLocation.historicalSignificance || "" }
    };
  }

  if (!knowledge) return null;

  const title = knowledge.title?.[lang] || knowledge.title?.en || (localLocation?.name ? localLocation.name[lang] : '');
  const subtitle = knowledge.subtitle?.[lang] || knowledge.subtitle?.en || '';
  const description = knowledge.description?.[lang] || knowledge.description?.en || '';
  const spiritual = isCity ? (knowledge.spiritual?.[lang] || knowledge.spiritual?.en || '') : '';
  const living = isCity ? (knowledge.living?.[lang] || knowledge.living?.en || '') : '';
  const cultural = !isCity ? (knowledge.cultural?.[lang] || knowledge.cultural?.en || '') : '';

  const labels = factLabels[lang] || factLabels.en;
  
  const handleClose = () => {
    setIsVisible(false);
    // Framer motion will handle unmounting if we use AnimatePresence, 
    // but for now keeping existing structure to avoid re-writing app/map/page logic.
    // Sync with Framer duration: 0.2s
    const delay = 200;
    
    setTimeout(() => {
      onClose();
      setTimeout(() => setLocalLocation(null), 50);
    }, delay);
  };

  return (
    <>
      <div className={`kp-backdrop ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose} />

      <aside
        className={`kp-panel ${isVisible ? 'visible' : 'hidden'} ${isRiver ? 'river-theme' : isCity ? 'city-theme' : 'mountain-theme'} kp-panel--${sheetMode}`}
        onClick={() => {
          // Cycle modes on click for the header area on mobile
          if (window.innerWidth < 768) {
            if (sheetMode === 'collapsed') setSheetMode('half');
            else if (sheetMode === 'half') setSheetMode('full');
          }
        }}
      >
        <div
          className="kp-drag-handle"
          onClick={(e) => {
            e.stopPropagation();
            setSheetMode(prev => prev === 'full' ? 'half' : (prev === 'half' ? 'collapsed' : 'half'));
          }}
        />
        <div className="kp-lang-switcher">
          {(['en', 'kn', 'hi'] as const).map((l) => (
            <button
              key={l}
              className={`kp-lang-btn ${lang === l ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setLang(l);
              }}
            >
              {l === 'en' ? 'EN' : l === 'kn' ? 'KN' : 'HI'}
            </button>
          ))}
        </div>
        <button
          className="kp-close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close Archival Sheet"
        >
          ×
        </button>

        <div className="kp-content">
          <div className="kp-header">
            <h1 className="kp-title">{title}</h1>
            
            {!isCity && (
              <div className="kp-tag-container">
                {knowledge.meta?.[lang] && (
                  <span className="kp-meta-badge">{knowledge.meta[lang]}</span>
                )}
                {knowledge.type?.[lang] && (
                  <span className="kp-type-tag">{knowledge.type[lang]}</span>
                )}
                {knowledge.scale?.[lang] && (
                  <span className="kp-scale-tag">{knowledge.scale[lang]}</span>
                )}
                {knowledge.importance?.[lang] && (
                  <span className="kp-importance-tag">{knowledge.importance[lang]}</span>
                )}
                {knowledge.relation?.[lang] && (
                  <p className="kp-relation">{knowledge.relation[lang]}</p>
                )}
                {subtitle && <p className="kp-subtitle">{subtitle}</p>}
              </div>
            )}
          </div>

          {isCity && (
            <div className="kp-hero-container">
              <div className="kp-hero city-hero">
                <img
                  src={knowledge.image}
                  alt={String(title)}
                  className="kp-hero-img"
                />
                <div className="kp-hero-overlay" />
              </div>
              {knowledge.identity && (
                <div className="kp-identity-strip">
                  <div className="identity-item">
                    <span className="identity-label">{UI_TEXT.region[lang]}</span>
                    <span className="identity-value">{knowledge.identity.region[lang]}</span>
                  </div>
                  <div className="identity-item">
                    <span className="identity-label">{UI_TEXT.river[lang]}</span>
                    <span className="identity-value">{knowledge.identity.river[lang]}</span>
                  </div>
                  <div className="identity-item">
                    <span className="identity-label">{UI_TEXT.era[lang]}</span>
                    <span className="identity-value">{knowledge.identity.era[lang]}</span>
                  </div>
                </div>
              )}
            </div>
          )}

              {!isCity && (
                <>
                  {isRiver && 'flow' in knowledge && (
                    <div className="kp-flow-cards">
                      {knowledge.flow[lang].split(' → ').map((node: string, i: number) => (
                        <div key={i} className="flow-card">
                          {node}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="kp-hero">
                    <img
                      src={knowledge.image || `/place-images/${localLocation.category}s/${localLocation.id}.jpg`}
                      alt={String(title)}
                      className="kp-hero-img"
                    />
                    <div className="kp-hero-overlay" />
                  </div>

                  <div className="kp-facts">
                    {Object.entries(knowledge.facts as Record<string, string>).map(([key, value]) => (
                      <div key={key} className="kp-fact-row" style={{ flexWrap: 'wrap', height: 'auto', minHeight: '32px' }}>
                        <span className="kp-fact-label" style={{ flex: '0 0 100px' }}>
                          {labels[key as keyof typeof labels] || key}
                        </span>
                        <span className="kp-fact-value" style={{ flex: '1', textAlign: 'right', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="kp-section">
                <h3 className="kp-section-label">
                  {isCity
                    ? UI_TEXT.historicalContext[lang]
                    : (isRiver
                      ? UI_TEXT.courseDescription[lang]
                      : UI_TEXT.mountainDescription[lang]
                    )
                  }
                </h3>
                <p className="kp-description">{String(description)}</p>
              </div>

              {isCity && (
                <>
                  <div className="kp-section kp-spiritual">
                    <div className="kp-divider" />
                    <h3 className="kp-section-label">
                      {UI_TEXT.spiritualSignificance[lang]}
                    </h3>
                    <p className="kp-description">{String(spiritual)}</p>
                  </div>

                  <div className="kp-section kp-living">
                    <h3 className="kp-section-label">
                      {UI_TEXT.livingTradition[lang]}
                    </h3>
                    <p className="kp-description">{String(living)}</p>
                  </div>
                </>
              )}

              {!isCity && (
                <div className="kp-section kp-cultural">
                  <div className="kp-divider" />
                  <h3 className="kp-section-label">
                    {isRiver
                      ? UI_TEXT.civilizationCulture[lang]
                      : UI_TEXT.mountainCultural[lang]
                    }
                  </h3>
                  <p className="kp-cultural-text">{String(cultural)}</p>
                </div>
              )}
            </div>
      </aside>
    </>
  );
}
