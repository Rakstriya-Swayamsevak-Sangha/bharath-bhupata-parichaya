'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { mountainKnowledge } from '@/data/mountainKnowledge';
import { riverKnowledge } from '@/data/riverKnowledge';

interface KnowledgePanelProps {
  onClose: () => void;
}

export function KnowledgePanel({ onClose }: KnowledgePanelProps) {
  const { selectedLocation } = useMap();
  const { lang, setLang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(false);
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
    if (selectedLocation?.category === 'mountain' || selectedLocation?.category === 'river') {
      setLocalLocation(selectedLocation);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [selectedLocation]);

  if (!localLocation) return null;
  if (localLocation.category !== 'mountain' && localLocation.category !== 'river') return null;

  const isRiver = localLocation.category === 'river';
  const knowledge = isRiver ? riverKnowledge[localLocation.id] : mountainKnowledge[localLocation.id];
  
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
      setTimeout(() => setLocalLocation(null), 100);
    }, 320);
  };

  return (
    <>
      <div className={`kp-backdrop ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose} />
      
      <aside className={`kp-panel ${isVisible ? 'visible' : 'hidden'} ${isRiver ? 'river-theme' : 'mountain-theme'}`}>
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
          <div className="kp-header">
            <h1 className="kp-title">{title}</h1>
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

          {isRiver && 'flow' in knowledge && (
            <div className="kp-flow-strip">
              <div className="flow-line" />
              <div className="flow-nodes">
                {knowledge.flow[lang].split(' → ').map((node, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flow-node-container">
                      <div className="flow-dot" />
                      <span className="flow-label">{node}</span>
                    </div>
                    {i < arr.length - 1 && <div className="flow-arrow">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div className="kp-hero">
            <img 
              src={knowledge.image || `/place-images/${localLocation.category}s/${localLocation.id}.jpg`} 
              alt={title}
              className="kp-hero-img"
            />
            <div className="kp-hero-overlay" />
          </div>

          <div className="kp-facts">
            {Object.entries(knowledge.facts).map(([key, value]) => (
              <div key={key} className="kp-fact-row">
                <span className="kp-fact-label">{labels[key as keyof typeof labels] || key}</span>
                <span className="kp-fact-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="kp-section">
            <h3 className="kp-section-label">
              {isRiver 
                ? (lang === 'kn' ? 'ನದಿಯ ಹರಿವು' : lang === 'hi' ? 'नदी का प्रवाह' : 'Course Description')
                : (lang === 'kn' ? 'ವಿವರಣೆ' : lang === 'hi' ? 'विवरण' : 'Description')
              }
            </h3>
            <p className="kp-description">{description}</p>
          </div>

          <div className="kp-section kp-cultural">
            <div className="kp-divider" />
            <h3 className="kp-section-label">
              {isRiver
                ? (lang === 'kn' ? 'ನಾಗರಿಕತೆ ಮತ್ತು ಸಂಸ್ಕೃತಿ' : lang === 'hi' ? 'सभ्यता और संस्कृति' : 'Civilization & Culture')
                : (lang === 'kn' ? 'ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ' : lang === 'hi' ? 'सांस्कृतिक महत्व' : 'Cultural Significance')
              }
            </h3>
            <p className="kp-cultural-text">{cultural}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
