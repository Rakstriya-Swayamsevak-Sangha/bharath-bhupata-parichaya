'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { mountainKnowledge } from '@/data/mountainKnowledge';

interface KnowledgePanelProps {
  onClose: () => void;
}

export function KnowledgePanel({ onClose }: KnowledgePanelProps) {
  const { selectedLocation } = useMap();
  const { lang, setLang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(false);
  const [localLocation, setLocalLocation] = useState(selectedLocation);

  const factLabels: Record<string, Record<string, string>> = {
    en: { length: 'Length', highestPeak: 'Highest Peak', highest_peak: 'Highest Peak', extent: 'Extent', elevation: 'Elevation', altitude: 'Altitude' },
    kn: { length: 'ಉದ್ದ', highestPeak: 'ಅತಿಎತ್ತರದ ಶಿಖರ', highest_peak: 'ಅತಿಎತ್ತರದ ಶಿಖರ', extent: 'ವಿಸ್ತರಣೆ', elevation: 'ಎತ್ತರ', altitude: 'ಎತ್ತರ' },
    hi: { length: 'लंबाई', highestPeak: 'सर्वोच्च शिखर', highest_peak: 'सर्वोच्च शिखर', extent: 'विस्तार', elevation: 'ऊंचाई', altitude: 'ऊंचाई' },
  };

  useEffect(() => {
    if (selectedLocation?.category === 'mountain') {
      setLocalLocation(selectedLocation);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Let animation finish before clearing localLocation
    }
  }, [selectedLocation]);

  if (!localLocation || localLocation.category !== 'mountain') return null;

  const knowledge = mountainKnowledge[localLocation.id];
  if (!knowledge) return null;

  const title = knowledge.title?.[lang] || knowledge.title?.en || localLocation.name;
  const subtitle = knowledge.subtitle?.[lang] || knowledge.subtitle?.en || '';
  const description = knowledge.description[lang] || knowledge.description.en;
  const cultural = knowledge.cultural[lang] || knowledge.cultural.en;
  const labels = factLabels[lang] || factLabels.en;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      // Only clear local context after external state is handled
      setTimeout(() => setLocalLocation(null), 100);
    }, 320);
  };

  return (
    <>
      <div className={`kp-backdrop ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose} />
      
      <aside className={`kp-panel ${isVisible ? 'visible' : 'hidden'}`}>
        {/* Archival Trilingual Switcher */}
        <div className="kp-lang-switcher">
          {(['en', 'kn', 'hi'] as const).map((l) => (
            <button
              key={l}
              className={`kp-lang-btn ${lang === l ? 'active' : ''}`}
              onClick={() => setLang(l)}
            >
              {l === 'en' ? 'EN' : l === 'kn' ? 'KN' : 'HI'}
            </button>
          ))}
        </div>
        <button className="kp-close" onClick={handleClose} aria-label="Close Archival Sheet">
          ×
        </button>

        <div className="kp-content">
          {/* 1. HEADER SECTION */}
          <div className="kp-header">
            <h1 className="kp-title">{title}</h1>
            {subtitle && <p className="kp-subtitle">{subtitle}</p>}
          </div>

          {/* 2. HERO IMAGE */}
          <div className="kp-hero">
            <img 
              src={knowledge.image || `/images/mountains/${localLocation.id}.jpg`} 
              alt={title}
              className="kp-hero-img"
            />
            <div className="kp-hero-overlay" />
          </div>

          {/* 3. KEY FACTS BLOCK */}
          <div className="kp-facts">
            {Object.entries(knowledge.facts).map(([key, value]) => (
              <div key={key} className="kp-fact-row">
                <span className="kp-fact-label">{labels[key as keyof typeof labels] || key}</span>
                <span className="kp-fact-value">{value}</span>
              </div>
            ))}
          </div>

          {/* 4. DESCRIPTION SECTION */}
          <div className="kp-section">
            <p className="kp-description">{description}</p>
          </div>

          {/* 5. CULTURAL INSIGHT SECTION */}
          <div className="kp-section kp-cultural">
            <div className="kp-divider" />
            <h3 className="kp-section-label">
              {lang === 'kn' ? 'ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ' : lang === 'hi' ? 'सांस्कृतिक महत्व' : 'Cultural Significance'}
            </h3>
            <p className="kp-cultural-text">{cultural}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
