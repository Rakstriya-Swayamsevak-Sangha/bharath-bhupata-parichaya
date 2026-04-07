'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PRELOAD_IMAGES } from '@/data/assetsList';

/**
 * ARCHIVAL PRELOAD SYSTEM
 * Forcefully prefetches all archival images, maps, and civilizational data
 * into the local device cache during the initial visit.
 */
export default function PreloadSystem() {
  const router = useRouter();

  useEffect(() => {
    // 1. Prefetch critical routes via Next.js router
    router.prefetch('/map');

    // 2. Clear old caches to ensure state consistency (App Shell Lock)
    const clearOldCaches = async () => {
      if (!('caches' in window)) return;
      const cacheNames = await caches.keys();
      const currentCaches = [
        'cultural-data-v1', 
        'atlas-assets-v1', 
        'google-fonts-v1', 
        'start-url', 
        'workbox-precache'
      ];
      
      await Promise.all(
        cacheNames.map(name => {
          if (!currentCaches.some(curr => name.includes(curr))) {
            return caches.delete(name);
          }
          return Promise.resolve();
        })
      );
    };

    // 3. FULL MUSEUM-GRADE WARM-UP
    const warmUp = async () => {
      await clearOldCaches();
      
      // All discovered archival images + core data files
      const criticalAssets = [
        '/',
        '/map/',
        '/countries.geojson',
        '/india_states.geojson',
        '/data/mountains.json',
        '/data/rivers.json',
        '/manifest.json',
        '/favicon.png',
        ...PRELOAD_IMAGES
      ];

      try {
        // Parallel fetch with low priority
        await Promise.all(
          criticalAssets.map(url => 
            fetch(url, { priority: 'low' }).catch(() => {})
          )
        );
      } catch (e) {
        console.warn('Archival Preload failed:', e);
      }
    };

    // Small delay to prevent blocking initial interaction
    const timer = setTimeout(warmUp, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
