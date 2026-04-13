'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { PRELOAD_IMAGES } from '@/data/assetsList';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PROGRESSIVE CACHING SYSTEM (3-TIER)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Strategy:
 * 1. TIER 1 (Critical): Warm up essential GeoJSON immediately.
 * 2. TIER 2 (Interaction): Helper to cache interaction-specific assets.
 * 3. TIER 3 (Background): Quietly cache remaining assets during idle time.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const CRITICAL_DATA = [
  '/countries.geojson',
  '/india_states.geojson',
  '/data/external_borders.json',
  '/data/internal_borders.json',
];

const EXTENDED_DATA = [
  '/data/mountains.json',
  '/data/rivers.json',
];

export default function PreloadSystem() {
  const router = useRouter();

  useEffect(() => {
    // 1. Prefetch core route
    router.prefetch('/bharatvarsha');

    const warmUp = async () => {
      // ─── Phase 1: Tier 1 Warm-up (Serial/High Priority) ──────────────
      for (const url of CRITICAL_DATA) {
        try {
          await fetch(url, { priority: 'high' as any });
        } catch (e) {}
      }

      // ─── Phase 2: Tier 3 Background Queue (Batch/Idle) ───────────────
      const processQueue = async () => {
        // Data first
        for (const url of EXTENDED_DATA) {
          try {
            await fetch(url, { priority: 'low' as any });
          } catch (e) {}
        }

        // Then all remaining images in slow batches
        const batchSize = 2;
        for (let i = 0; i < PRELOAD_IMAGES.length; i += batchSize) {
          const batch = PRELOAD_IMAGES.slice(i, i + batchSize);
          await Promise.allSettled(
            batch.map(url => fetch(url, { priority: 'low' as any }).catch(() => {}))
          );
          await new Promise(r => setTimeout(r, 400)); // Be extremely gentle
        }
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => processQueue());
      } else {
        setTimeout(processQueue, 10000);
      }
    };

    // Start warm-up after a short delay to keep initial load snappier
    const timer = setTimeout(warmUp, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

/**
 * Tier 2: Interaction-Driven Cache Trigger
 * Call this when a user clicks a marker or opens a panel.
 * Accepts single URL or array of URL variants.
 */
export async function cacheInteractionAssets(urls: string | string[]) {
  if (typeof window === 'undefined') return;

  const urlList = Array.isArray(urls) ? urls : [urls];

  // Preload all variants (SW will cache whichever succeeds)
  urlList.forEach(url => {
    if (!url) return;
    fetch(url, { priority: 'low' as any }).catch(() => {
      // SW will handle the actual caching policy
    });
  });
}
