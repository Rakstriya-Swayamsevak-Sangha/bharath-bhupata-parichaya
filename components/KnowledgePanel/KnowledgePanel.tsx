'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { motion, AnimatePresence } from 'framer-motion';
import { UI_TEXT } from '@/data/uiText';

interface KnowledgePanelProps {
  onClose: () => void;
}

export function KnowledgePanel({ onClose }: KnowledgePanelProps) {
  const { selectedLocation } = useMap();
  const { lang, setLang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sheetMode, setSheetMode] = useState<'collapsed' | 'half' | 'full'>('full');
  const [localLocation, setLocalLocation] = useState(selectedLocation);
  const [knowledge, setKnowledge] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) setDeviceMode('desktop');
      else if (window.innerWidth >= 768) setDeviceMode('tablet');
      else setDeviceMode('mobile');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      const category = selectedLocation.category;
      const id = selectedLocation.id;
      
      setLoading(true);
      setLocalLocation(selectedLocation);

      // Lazy load knowledge data
      const loadKnowledge = async () => {
        try {
          let data;
          if (category === 'mountain') {
            const mod = await import('@/data/mountainKnowledge');
            data = mod.mountainKnowledge[id];
          } else if (category === 'river') {
            const mod = await import('@/data/riverKnowledge');
            data = mod.riverKnowledge[id];
          } else if (category === 'city') {
            const mod = await import('@/data/cityKnowledge');
            data = mod.cityKnowledge[id];
          }

          if (data) {
            setKnowledge(data);
          } else {
            // Fallback for missing items
            setKnowledge({
              ...selectedLocation,
              title: selectedLocation.name,
              description: { en: selectedLocation.description, kn: selectedLocation.description, hi: selectedLocation.description },
              facts: (selectedLocation as any).metadata || {},
              cultural: { en: (selectedLocation as any).historicalSignificance || "", kn: (selectedLocation as any).historicalSignificance || "", hi: (selectedLocation as any).historicalSignificance || "" }
            });
          }
        } catch (err) {
          console.error('Failed to load knowledge data:', err);
        } finally {
          setLoading(false);
          if (deviceMode === 'mobile') {
            setSheetMode('half');
          } else {
            setSheetMode('full');
          }
          setIsVisible(true);
        }
      };

      loadKnowledge();
    } else {
      setIsVisible(false);
    }
  }, [selectedLocation, deviceMode]);

  if (!localLocation || !knowledge) return null;

  const isRiver = localLocation.category === 'river';
  const isCity = localLocation.category === 'city';

  const title = knowledge.title?.[lang] || knowledge.title?.en || (localLocation?.name ? localLocation.name[lang] : '');
  const subtitle = knowledge.subtitle?.[lang] || knowledge.subtitle?.en || '';
  const description = knowledge.description?.[lang] || knowledge.description?.en || '';
  const spiritual = isCity ? (knowledge.spiritual?.[lang] || knowledge.spiritual?.en || '') : '';
  const living = isCity ? (knowledge.living?.[lang] || knowledge.living?.en || '') : '';
  const cultural = !isCity ? (knowledge.cultural?.[lang] || knowledge.cultural?.en || '') : '';

  const labels = factLabels[lang] || factLabels.en;
  
  const handleClose = () => {
    setIsVisible(false);
    const delay = 200;
    setTimeout(() => {
      onClose();
      setTimeout(() => setLocalLocation(null), 50);
    }, delay);
  };

  // Mobile Bottom Sheet Snap Logic (Interaction Audit Fix)
  const handleDragEnd = (event: any, info: any) => {
    if (deviceMode !== 'mobile') return;
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Upward drag
    if (velocity < -500 || offset < -100) {
      if (sheetMode === 'collapsed') setSheetMode('half');
      else if (sheetMode === 'half') setSheetMode('full');
    } 
    // Downward drag
    else if (velocity > 500 || offset > 100) {
      if (sheetMode === 'full') setSheetMode('half');
      else if (sheetMode === 'half') setSheetMode('collapsed');
      else handleClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="kp-backdrop" 
            onClick={handleClose} 
          />
        )}
      </AnimatePresence>

      <div
        className={`kp-panel-v2 ${isVisible ? 'open' : ''} ${isRiver ? 'river-theme' : isCity ? 'city-theme' : 'mountain-theme'}`}
      >
        {isVisible && (
          <div className="h-full overflow-y-auto relative">
            <div className="mobile-only">
               <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />
            </div>
            
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
                      src={knowledge.image || `/place-images/sacred-cities/${localLocation.id}.jpg`}
                      alt={String(title)}
                      className="kp-hero-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/place-images/sacred-cities/default.jpg';
                      }}
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
                      src={knowledge.image || `/place-images/${localLocation.category === 'city' ? 'sacred-cities' : localLocation.category + 's'}/${localLocation.id}.jpg`}
                      alt={String(title)}
                      className="kp-hero-img"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const overlay = target.nextElementSibling as HTMLElement;
                        if (overlay) overlay.style.display = 'none';
                      }}
                    />
                    <div className="kp-hero-overlay" />
                  </div>

                  <div className="kp-facts">
                    {Object.entries(knowledge.facts as Record<string, string>).map(([key, value]) => (
                      <div key={key} className="kp-fact-row" style={{ flexWrap: 'wrap', height: 'auto', minHeight: '32px', alignItems: 'flex-start' }}>
                        <span className="kp-fact-label" style={{ flex: '0 0 100px', paddingTop: '4px' }}>
                          {labels[key as keyof typeof labels] || key}
                        </span>
                        <span className="kp-fact-value" style={{ flex: '1', textAlign: 'right', whiteSpace: 'normal', wordBreak: 'break-word', paddingTop: '4px' }}>
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
          </div>
        )}
      </div>
    </>
  );
}
