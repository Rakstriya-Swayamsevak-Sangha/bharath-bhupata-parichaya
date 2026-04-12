'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PRELOAD_IMAGES } from '@/data/assetsList';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ARCHIVAL PRELOAD SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Forcefully prefetches all archival images, maps, and civilizational data
 * into the local device cache during the initial visit.
 * 
 * Works in tandem with ServiceWorkerManager — this handles the main-thread
 * prefetch while SW handles cache persistence. Uses requestIdleCallback
 * to avoid blocking animations or interaction.
 * ═══════════════════════════════════════════════════════════════════════════════
 */
export default function PreloadSystem() {
  const router = useRouter();

  useEffect(() => {
    // 1. Prefetch critical routes via Next.js router
    router.prefetch('/bharatvarsha');

    // 2. FULL MUSEUM-GRADE WARM-UP (Non-blocking)
    const warmUp = async () => {
      // Core data files (small, critical)
      const criticalData = [
        '/countries.geojson',
        '/india_states.geojson',
        '/data/mountains.json',
        '/data/rivers.json',
        '/data/external_borders.json',
        '/data/internal_borders.json',
      ];

      // Fetch critical data first (serial, reliable)
      for (const url of criticalData) {
        try {
          await fetch(url, { priority: 'low' as any });
        } catch {
          // Silent — SW will serve cached version if available
        }
      }

      // Then progressively load images in batches to avoid overwhelming
      const batchSize = 4;
      for (let i = 0; i < PRELOAD_IMAGES.length; i += batchSize) {
        const batch = PRELOAD_IMAGES.slice(i, i + batchSize);
        await Promise.allSettled(
          batch.map(url => fetch(url, { priority: 'low' as any }).catch(() => {}))
        );
        // Small yield between batches
        await new Promise(r => setTimeout(r, 100));
      }
    };

    // Use requestIdleCallback to avoid blocking initial animations
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => warmUp(), { timeout: 5000 });
    } else {
      // Fallback: delayed start
      const timer = setTimeout(warmUp, 3000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return null;
}
