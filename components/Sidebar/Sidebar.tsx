'use client';

import React, { useEffect } from 'react';
import { useMap } from '@/providers/MapContext';
import { useLanguageStore } from '@/store/languageStore';
import { CloseButton } from '@/components/ui/CloseButton';
import { UI_TEXT } from '@/data/uiText';
import { Badge } from '@/components/ui/Badge';
import { Location } from '@/types/location';

interface MetadataGridProps {
  metadata?: Record<string, string | undefined>;
  excludeKeys?: string[];
}

function MetadataGrid({ metadata, excludeKeys = [] }: MetadataGridProps) {
  if (!metadata) return null;

  const entries = Object.entries(metadata).filter(
    ([key]) => !excludeKeys.includes(key)
  );

  if (entries.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {entries.map(([key, value]) => (
        <div key={key} className="bg-background rounded-sm p-3 border border-border/50">
          <dt
            className="text-accent/60 mb-1"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {key.replace(/_/g, ' ')}
          </dt>
          <dd className="text-textPrimary font-medium text-sm">
            {value || '—'}
          </dd>
        </div>
      ))}
    </div>
  );
}

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  const { lang } = useLanguageStore();
  const name = (lang === 'hi' && location.nameHindi) ? location.nameHindi : location.name;
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="font-cinzel text-2xl font-semibold text-primary mb-1">
            {name}
          </h2>
          {(lang !== 'hi' && location.nameHindi) && (
            <p className="text-accent text-lg" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              {location.nameHindi}
            </p>
          )}
        </div>
        <Badge category={location.category} />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-textSecondary text-sm leading-relaxed">
            {location.description}
          </p>
        </div>

        {location.historicalSignificance && (
          <div className="border-t border-border pt-4">
            <h3
              className="font-cinzel font-medium mb-2"
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FF9933',
              }}
            >
              Historical Significance
            </h3>
            <p className="text-textSecondary text-sm leading-relaxed">
              {location.historicalSignificance}
            </p>
          </div>
        )}

        <MetadataGrid metadata={location.metadata} />

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center gap-2 text-textSecondary text-xs">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              {location.latitude !== undefined && location.longitude !== undefined 
                ? `${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(4)}°E`
                : 'Coordinates Unavailable'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { selectedLocation, isSidebarOpen, closeSidebar } = useMap();
  const { lang } = useLanguageStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen, closeSidebar]);

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[420px]
          bg-surface z-50 shadow-2xl
          animate-slide-in
          overflow-y-auto
          border-l border-border
        `}
        role="dialog"
        aria-label="Location details"
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border"
          style={{ background: 'linear-gradient(180deg, #2A2520 0%, #2A2520 100%)' }}
        >
          <h1
            className="font-cinzel font-medium text-primary"
            style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {UI_TEXT.locationDetail[lang]}
          </h1>
          <CloseButton onClick={closeSidebar} />
        </div>

        <div className="p-6">
          {selectedLocation && <LocationCard location={selectedLocation} />}
        </div>
      </aside>
    </>
  );
}
