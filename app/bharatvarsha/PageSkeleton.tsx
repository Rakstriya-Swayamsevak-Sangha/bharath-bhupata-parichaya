'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function PageSkeleton() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#080706] pointer-events-none page-skeleton-overlay">
      {/* 1. HEADER SKELETON */}
      <header className="header pointer-events-auto">
        <div className="header-container">
          <div className="title-standard flex flex-col gap-[6px] w-[200px]">
            <div className="skeleton-base skeleton-title-line" style={{ width: '45%' }} />
            <div className="skeleton-base skeleton-title-line" style={{ width: '30%' }} />
          </div>

          <div className="header-actions">
            {/* Search Bar Skeleton */}
            <div className="skeleton-base skeleton-search-bar" style={{ width: '120px', height: '36px' }}>
              <div className="skeleton-search-placeholder" />
            </div>

            {/* Real Language Toggle - Interactive */}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* 2. MAP & 3. FILTERS SKELETON */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Map Container Skeleton */}
        <div className="absolute inset-0 skeleton-map-container">
          {/* Subtle map shape details can go here optionally */}
          <div className="skeleton-map-texture" />
        </div>

        {/* Filter Capsule Skeleton */}
        <div className="filters-mobile-overlay">
          <div className="mobile-pill-bar">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-base skeleton-capsule">
                <div className="skeleton-capsule-text" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
