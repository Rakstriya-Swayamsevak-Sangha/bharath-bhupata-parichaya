'use client';
import React from 'react';

export const SkeletonLine = ({ width = '100%', height = '14px', className = '', style = {} }: any) => (
  <div className={`skeleton-base ${className}`} style={{ width, height, borderRadius: '4px', marginBottom: '8px', ...style }} />
);

export const SkeletonBox = ({ width = '100%', height = 'auto', className = '', style = {} }: any) => (
  <div className={`skeleton-base ${className}`} style={{ width, height, borderRadius: '4px', ...style }} />
);

export const SkeletonPill = ({ width = '60px', height = '20px', className = '' }: any) => (
  <div className={`skeleton-base ${className}`} style={{ width, height, borderRadius: '12px' }} />
);

export function RegionSkeleton() {
  return (
    <div className="kp-content" style={{ opacity: 1 }}>
      <div className="kp-header text-center w-full">
        <SkeletonLine width="60%" height="28px" style={{ margin: '0 auto 8px', display: 'block' }} />
        <SkeletonLine width="40%" height="16px" style={{ margin: '0 auto 16px', display: 'block' }} />
        <div className="kp-tag-container" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <SkeletonPill width="80px" />
          <SkeletonPill width="100px" />
          <SkeletonPill width="60px" />
        </div>
      </div>

      <SkeletonBox className="kp-hero" height="200px" style={{ border: '1px solid rgba(212, 175, 55, 0.15)', marginTop: '24px' }} />

      <div className="kp-chronology" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="chronology-item" style={{ display: 'flex', gap: '12px' }}>
            <div className="chronology-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="skeleton-base" style={{ width: '8px', height: '8px', borderRadius: '50%', marginBottom: '4px' }} />
              {i < 5 && <div className="skeleton-base" style={{ width: '2px', height: '36px' }} />}
            </div>
            <div className="chronology-content" style={{ flex: 1, paddingTop: '2px' }}>
              <SkeletonLine width="30%" height="10px" className="mb-2" />
              <SkeletonLine width="100%" height="13px" className="mb-1" />
              <SkeletonLine width="85%" height="13px" />
            </div>
          </div>
        ))}
      </div>

      <div className="kp-section" style={{ marginTop: '24px' }}>
        <SkeletonLine width="40%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="95%" />
          <SkeletonLine width="100%" />
          <SkeletonLine width="90%" />
          <SkeletonLine width="85%" />
        </div>
      </div>

      <div className="kp-section" style={{ marginTop: '24px' }}>
        <div className="kp-divider" />
        <SkeletonLine width="50%" height="18px" className="mb-4" />
        <div style={{ background: 'rgba(212, 175, 55, 0.04)', padding: '16px', borderLeft: '2px solid rgba(212, 175, 55, 0.2)', borderRadius: '4px' }}>
           <SkeletonLine width="100%" />
           <SkeletonLine width="92%" />
           <SkeletonLine width="96%" />
           <SkeletonLine width="85%" />
        </div>
      </div>
    </div>
  );
}

export function CitySkeleton() {
  return (
    <div className="kp-content" style={{ opacity: 1 }}>
      <div className="kp-header text-center w-full">
        <SkeletonLine width="70%" height="28px" style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className="kp-hero-container" style={{ marginTop: '24px' }}>
        <SkeletonBox className="kp-hero city-hero" height="200px" />
        <div className="kp-identity-strip" style={{ display: 'flex', gap: '16px', marginTop: '12px', background: 'rgba(212, 175, 55, 0.05)', padding: '12px', borderRadius: '4px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="identity-item" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <SkeletonLine width="40%" height="10px" />
              <SkeletonLine width="80%" height="14px" />
            </div>
          ))}
        </div>
      </div>

      <div className="kp-section" style={{ marginTop: '24px' }}>
        <SkeletonLine width="40%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="95%" />
          <SkeletonLine width="90%" />
        </div>
      </div>

      <div className="kp-section kp-spiritual" style={{ marginTop: '24px' }}>
        <div className="kp-divider" />
        <SkeletonLine width="60%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="92%" />
          <SkeletonLine width="98%" />
          <SkeletonLine width="85%" />
        </div>
      </div>

      <div className="kp-section kp-living" style={{ marginTop: '24px' }}>
        <div className="kp-divider" />
        <SkeletonLine width="45%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="88%" />
          <SkeletonLine width="95%" />
        </div>
      </div>
    </div>
  );
}

export function RiverSkeleton() {
  return (
    <div className="kp-content" style={{ opacity: 1 }}>
      <div className="kp-header text-center w-full">
        <SkeletonLine width="65%" height="28px" style={{ margin: '0 auto 8px', display: 'block' }} />
        <div className="kp-tag-container" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <SkeletonPill width="70px" />
          <SkeletonPill width="90px" />
          <SkeletonPill width="80px" />
        </div>
      </div>

      <div className="kp-flow-cards" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
        {[1, 2, 3].map(i => (
          <SkeletonBox key={i} width="80px" height="30px" style={{ borderRadius: '15px' }} />
        ))}
      </div>

      <SkeletonBox className="kp-hero" height="200px" style={{ border: '1px solid rgba(30, 95, 168, 0.3)', marginTop: '24px' }} />

      <div className="kp-facts" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingTop: '18px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="kp-fact-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SkeletonLine width="20%" height="10px" />
            <SkeletonLine width="40%" height="13px" />
          </div>
        ))}
      </div>

      <div className="kp-section" style={{ marginTop: '24px' }}>
        <SkeletonLine width="40%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="95%" />
          <SkeletonLine width="100%" />
          <SkeletonLine width="85%" />
        </div>
      </div>

      <div className="kp-section kp-cultural" style={{ marginTop: '24px' }}>
        <div className="kp-divider" />
        <SkeletonLine width="45%" height="18px" className="mb-4" />
        <div style={{ background: 'rgba(212, 175, 55, 0.04)', padding: '16px', borderLeft: '2px solid rgba(212, 175, 55, 0.2)', borderRadius: '4px' }}>
           <SkeletonLine width="100%" />
           <SkeletonLine width="92%" />
           <SkeletonLine width="96%" />
        </div>
      </div>
    </div>
  );
}

export function MountainSkeleton() {
  return (
    <div className="kp-content" style={{ opacity: 1 }}>
      <div className="kp-header text-center w-full">
        <SkeletonLine width="55%" height="28px" style={{ margin: '0 auto 8px', display: 'block' }} />
        <SkeletonLine width="40%" height="14px" style={{ margin: '0 auto 8px', display: 'block' }} />
      </div>

      <SkeletonBox className="kp-hero" height="200px" style={{ border: '1px solid rgba(139, 69, 19, 0.3)', marginTop: '24px' }} />

      <div className="kp-facts" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', borderTop: '1px solid rgba(139, 69, 19, 0.1)', paddingTop: '18px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="kp-fact-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SkeletonLine width="25%" height="10px" />
            <SkeletonLine width="35%" height="13px" />
          </div>
        ))}
      </div>

      <div className="kp-section" style={{ marginTop: '24px' }}>
        <SkeletonLine width="40%" height="18px" className="mb-4" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="100%" />
          <SkeletonLine width="98%" />
          <SkeletonLine width="92%" />
          <SkeletonLine width="88%" />
        </div>
      </div>

      <div className="kp-section kp-cultural" style={{ marginTop: '24px' }}>
        <div className="kp-divider" />
        <SkeletonLine width="50%" height="18px" className="mb-4" />
         <div style={{ background: 'rgba(212, 175, 55, 0.04)', padding: '16px', borderLeft: '2px solid rgba(212, 175, 55, 0.2)', borderRadius: '4px' }}>
           <SkeletonLine width="100%" />
           <SkeletonLine width="92%" />
           <SkeletonLine width="96%" />
           <SkeletonLine width="85%" />
        </div>
      </div>
    </div>
  );
}
