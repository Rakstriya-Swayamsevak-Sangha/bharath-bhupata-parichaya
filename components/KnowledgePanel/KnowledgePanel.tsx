'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { motion, AnimatePresence } from 'framer-motion';
import { UI_TEXT } from '@/data/uiText';
import { RegionSkeleton, CitySkeleton, RiverSkeleton, MountainSkeleton } from './KnowledgePanelSkeletons';
import { SafeImage } from '@/components/SafeImage/SafeImage';
import { safeGet, safeGetString, safeGetPath } from '@/utils/safeData';
import { getAssetPath } from '@/data/imageManifest';
import { resolveText } from '@/utils/resolveText';

interface KnowledgePanelProps {
  onClose: () => void;
}

interface SafeLocation {
  id: string;
  name: { en: string; kn: string; hi: string };
  category: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  metadata?: Record<string, string>;
  historicalSignificance?: string;
}

export const KnowledgePanel = React.memo(function KnowledgePanel({ onClose }: KnowledgePanelProps) {
  const { selectedLocation, isNavigating } = useMap();
  const { lang, setLang } = useLanguageStore();
  const [isVisible, setIsVisible] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sheetMode, setSheetMode] = useState<'collapsed' | 'half' | 'full'>('full');
  const [localLocation, setLocalLocation] = useState<SafeLocation | null>(null);
  const [knowledge, setKnowledge] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

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
    let isMounted = true;

    // 1. Handle Closing
    if (!selectedLocation || !['mountain', 'river', 'city', 'region'].includes(selectedLocation.category)) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        if (isMounted) {
          setLocalLocation(null);
          setKnowledge(null);
        }
      }, 400);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    // 2. Handle Opening / Loading
    // Only fetch if location changed or knowledge is missing
    if (selectedLocation?.id && selectedLocation.id !== localLocation?.id || !knowledge) {
      const category = selectedLocation?.category;
      const id = selectedLocation?.id;

      if (!category || !id) return;

      setLoading(true);
      setLocalLocation(selectedLocation as SafeLocation);
      setLoadError(false);

      const loadKnowledge = async () => {
        const startTime = Date.now();
        try {
          let data;
          if (category === 'mountain') {
            const mod = await import('@/data/mountainKnowledge').catch(() => null);
            data = mod?.mountainKnowledge?.[id];
          } else if (category === 'river') {
            const mod = await import('@/data/riverKnowledge').catch(() => null);
            data = mod?.riverKnowledge?.[id];
          } else if (category === 'city') {
            const mod = await import('@/data/cityKnowledge').catch(() => null);
            data = mod?.cityKnowledge?.[id];
          } else if (category === 'region') {
            const mod = await import('@/data/regionKnowledge').catch(() => null);
            data = mod?.regionKnowledge?.[id];
          }

          if (!isMounted) return;

          if (data) {
            setKnowledge(data);
            const imagePath = getAssetPath(id);

            import('@/components/PWA/PreloadSystem').then(mod => {
              if (mod?.cacheInteractionAssets) {
                mod.cacheInteractionAssets([imagePath]);
              }
            }).catch(() => { });
          } else {
            const locationName = selectedLocation?.name || { en: id, kn: id, hi: id };
            setKnowledge({
              id: id,
              title: locationName,
              description: { en: safeGetString(selectedLocation?.description, ''), kn: safeGetString(selectedLocation?.description, ''), hi: safeGetString(selectedLocation?.description, '') },
              facts: selectedLocation?.metadata || {},
              cultural: { en: safeGetString(selectedLocation?.historicalSignificance, ''), kn: safeGetString(selectedLocation?.historicalSignificance, ''), hi: safeGetString(selectedLocation?.historicalSignificance, '') }
            });

            const imagePath = getAssetPath(id);

            import('@/components/PWA/PreloadSystem').then(mod => {
              if (mod?.cacheInteractionAssets) {
                mod.cacheInteractionAssets([imagePath]);
              }
            }).catch(() => { });
          }
        } catch (err) {
          console.error('Failed to load knowledge data:', err);
          setLoadError(true);
        } finally {
          if (isMounted) {
            const elapsed = Date.now() - startTime;
            const minTime = 300;
            if (elapsed < minTime) {
              setTimeout(() => setLoading(false), minTime - elapsed);
            } else {
              setLoading(false);
            }
          }
        }
      };

      loadKnowledge();
    }

    // 3. Control Visibility based on Navigation
    if (isMounted && knowledge && !isNavigating) {
      if (deviceMode === 'mobile') setSheetMode('half');
      else setSheetMode('full');
      setIsVisible(true);
    } else if (isNavigating) {
      setIsVisible(false); // Hide panel while moving
    }

    return () => {
      isMounted = false;
    };
  }, [selectedLocation, isNavigating, deviceMode, knowledge, localLocation?.id]);

  if (!localLocation) return null;

  const isRiver = localLocation.category === 'river';
  const isCity = localLocation.category === 'city';
  const isRegion = localLocation.category === 'region';
  const isLoadingState = loading || !knowledge;

  const title = resolveText(knowledge?.title || localLocation?.name, lang);
  const subtitle = resolveText(knowledge?.subtitle, lang);
  const description = resolveText(knowledge?.description, lang);
  const spiritual = isCity ? resolveText(knowledge?.spiritual, lang) : '';
  const living = isCity ? resolveText(knowledge?.living, lang) : '';

  // Harmonized content mapping for Regions
  const cultural = isRegion
    ? (knowledge?.culturalSignificance?.[lang] ? knowledge.culturalSignificance[lang].join('\n\n') : '')
    : (!isCity ? resolveText(knowledge?.cultural, lang) : '');

  const meta = resolveText(knowledge?.meta, lang);
  const type = resolveText(knowledge?.type, lang);
  const scale = resolveText(knowledge?.scale, lang);
  const importance = resolveText(knowledge?.importance, lang);
  const relation = resolveText(knowledge?.relation, lang);

  const contextStrip = resolveText(knowledge?.contextStrip, lang);

  // Map timeline to facts for standard UI display
  const timelineData = isRegion ? (knowledge?.timeline?.[lang] || knowledge?.timeline?.en) : null;
  const finalFacts = isRegion && timelineData
    ? timelineData.reduce((acc: any, item: any) => {
      acc[item.label] = item.value;
      return acc;
    }, {})
    : (knowledge?.facts || {});

  const labels = factLabels[lang] || factLabels.en;

  const handleClose = () => {
    setIsVisible(false);
    const delay = 400; // Match CSS transition duration in globals.css
    setTimeout(() => {
      onClose();
      // localLocation is now handled by the main useEffect cleanup
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }
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
            transition={{ duration: 0.4 }}
            className="kp-backdrop"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`kp-panel-v2 ${isVisible ? 'open' : ''} ${isRiver ? 'river-theme' : isCity ? 'city-theme' : isRegion ? 'region-theme' : 'mountain-theme'}`}
        initial={false}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="h-full overflow-y-auto relative"
              style={{ overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch' }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
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

              {isLoadingState ? (
                <>
                  {isRegion && <RegionSkeleton />}
                  {isCity && <CitySkeleton />}
                  {isRiver && <RiverSkeleton />}
                  {!isRegion && !isCity && !isRiver && <MountainSkeleton />}
                </>
              ) : (
                <div className="kp-content">
                  <motion.div className="kp-header" variants={itemVariants}>
                    <h1 className="kp-title">{title}</h1>

                    {!isCity && (
                      <div className="kp-tag-container">
                        {meta && (
                          <span className="kp-meta-badge">{meta}</span>
                        )}
                        {type && (
                          <span className="kp-type-tag">{type}</span>
                        )}
                        {scale && (
                          <span className="kp-scale-tag">{scale}</span>
                        )}
                        {importance && (
                          <span className="kp-importance-tag">{importance}</span>
                        )}
                        {relation && (
                          <p className="kp-relation">{relation}</p>
                        )}
                        {subtitle && <p className="kp-subtitle">{subtitle}</p>}
                      </div>
                    )}
                  </motion.div>

                  {isCity && (
                    <motion.div className="kp-hero-container" variants={itemVariants}>
                      <SafeImage
                        src={getAssetPath(knowledge.id || localLocation.id)}
                        alt={String(title)}
                        className="kp-hero city-hero"
                        fallbackColor="#3A2F24"
                      />
                      {knowledge.identity && (
                        <div className="kp-identity-strip">
                          <div className="identity-item">
                            <span className="identity-label">{UI_TEXT.region[lang]}</span>
                            <span className="identity-value">{safeGetPath(knowledge.identity, `region.${lang}`, '')}</span>
                          </div>
                          <div className="identity-item">
                            <span className="identity-label">{UI_TEXT.river[lang]}</span>
                            <span className="identity-value">{safeGetPath(knowledge.identity, `river.${lang}`, '')}</span>
                          </div>
                          <div className="identity-item">
                            <span className="identity-label">{UI_TEXT.era[lang]}</span>
                            <span className="identity-value">{safeGetPath(knowledge.identity, `era.${lang}`, '')}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {!isCity && (
                    <>
                      {isRiver && knowledge.flow && (
                        <motion.div className="kp-flow-cards" variants={itemVariants}>
                          {resolveText(knowledge.flow, lang).split(' → ').map((node: string, i: number) => (
                            <div key={i} className="flow-card">
                              {node}
                            </div>
                          ))}
                        </motion.div>
                      )}

                      <motion.div className="kp-hero" variants={itemVariants}>
                        <SafeImage
                          src={getAssetPath(knowledge.id || localLocation.id)}
                          alt={String(title)}
                          className="kp-hero"
                          fallbackColor="#3A2F24"
                          hideOnError={true}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        {isRegion ? (
                          <div className="kp-chronology">
                            {timelineData?.map((item: any, i: number) => (
                              <div key={i} className="chronology-item">
                                <div className="chronology-marker">
                                  <div className="marker-dot" />
                                  {i < (knowledge.timeline[lang] || knowledge.timeline.en).length - 1 && <div className="marker-line" />}
                                </div>
                                <div className="chronology-content">
                                  <span className="chronology-label">{item.label}</span>
                                  <span className="chronology-value">{item.value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="kp-facts">
                            {Object.entries(finalFacts as Record<string, string>).map(([key, value]) => (
                              <div key={key} className="kp-fact-row" style={{ flexWrap: 'wrap', height: 'auto', minHeight: '32px', alignItems: 'flex-start' }}>
                                <span className="kp-fact-label" style={{ flex: '0 0 120px', paddingTop: '4px' }}>
                                  {labels[key as keyof typeof labels] || key}
                                </span>
                                <span className="kp-fact-value" style={{ flex: '1', textAlign: 'right', whiteSpace: 'normal', wordBreak: 'break-word', paddingTop: '4px' }}>
                                  {resolveText(value, lang)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}

                  <motion.div className="kp-section" variants={itemVariants}>
                    <h3 className="kp-section-label">
                      {isCity
                        ? UI_TEXT.historicalContext[lang]
                        : (isRiver
                          ? UI_TEXT.courseDescription[lang]
                          : (isRegion ? (UI_TEXT as any).regionHistory[lang] : UI_TEXT.mountainDescription[lang])
                        )
                      }
                    </h3>

                    {contextStrip && (
                      <div className="kp-context-highlight" style={{
                        fontStyle: 'italic',
                        color: '#8B7355',
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: 'rgba(139, 115, 85, 0.05)',
                        borderLeft: '2px solid #8B7355'
                      }}>
                        {contextStrip}
                      </div>
                    )}

                    <p className="kp-description">{String(description)}</p>
                  </motion.div>

                  {isCity && (
                    <>
                      <motion.div className="kp-section kp-spiritual" variants={itemVariants}>
                        <div className="kp-divider" />
                        <h3 className="kp-section-label">
                          {UI_TEXT.spiritualSignificance[lang]}
                        </h3>
                        <p className="kp-description">{String(spiritual)}</p>
                      </motion.div>

                      <motion.div className="kp-section kp-living" variants={itemVariants}>
                        <h3 className="kp-section-label">
                          {UI_TEXT.livingTradition[lang]}
                        </h3>
                        <p className="kp-description">{String(living)}</p>
                      </motion.div>
                    </>
                  )}

                  {!isCity && (
                    <motion.div className="kp-section kp-cultural" variants={itemVariants}>
                      <div className="kp-divider" />
                      <h3 className="kp-section-label">
                        {isRiver
                          ? UI_TEXT.civilizationCulture[lang]
                          : (isRegion ? (UI_TEXT as any).regionCulture[lang] : UI_TEXT.mountainCultural[lang])
                        }
                      </h3>
                      <div className="kp-cultural-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                        {String(cultural)}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
});

KnowledgePanel.displayName = 'KnowledgePanel';
