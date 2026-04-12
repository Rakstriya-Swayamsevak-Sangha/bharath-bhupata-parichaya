'use client';

import { useEffect, useRef } from 'react';
import { PRELOAD_IMAGES } from '@/data/assetsList';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SERVICE WORKER LIFECYCLE MANAGER (Hardened)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Registers the hand-crafted service worker and manages:
 *   1. Registration with proper scope
 *   2. Update detection + seamless activation
 *   3. Background pre-cache messaging after idle
 *   4. Cache verification (only marks complete when truly verified)
 *   5. Precache-complete acknowledgment from SW
 * 
 * INVISIBLE: Zero UI impact, zero main-thread blocking.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const SW_PATH = '/sw.js';
const CACHE_COMPLETE_KEY = 'bharat-darshan-cache-ready';

export default function ServiceWorkerManager() {
  const registered = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (registered.current) return;
    registered.current = true;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register(SW_PATH, {
          scope: '/',
        });

        // ─── Handle updates silently ──────────────────────────────
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              // New SW activated — cache integrity needs re-verification
              localStorage.removeItem(CACHE_COMPLETE_KEY);
            }
          });
        });

        // ─── Listen for cache verification messages from SW ──────
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data?.type === 'PRECACHE_COMPLETE') {
            const { total, cached, failed } = event.data;
            if (failed === 0) {
              // All assets cached — request verification from SW
              navigator.serviceWorker.controller?.postMessage({ type: 'VERIFY_CACHE' });
            }
          }

          if (event.data?.type === 'CACHE_VERIFIED') {
            if (event.data.isComplete) {
              localStorage.setItem(CACHE_COMPLETE_KEY, 'true');
            }
          }
        });

        // ─── Trigger background pre-caching after idle ───────────
        if (registration.active) {
          scheduleBackgroundPrecache(registration.active);
        } else {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (navigator.serviceWorker.controller) {
              scheduleBackgroundPrecache(navigator.serviceWorker.controller);
            }
          });
        }

      } catch (err) {
        console.warn('[SW] Registration failed:', err);
      }
    };

    // Delay registration slightly to avoid blocking initial render
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW, { once: true });
    }
  }, []);

  return null; // Invisible — no UI
}


/**
 * Schedules background pre-caching via requestIdleCallback.
 * Sends asset URLs to the service worker for progressive caching 
 * during idle time — never blocks main thread or animations.
 * 
 * HARDENED: Only marks cache as complete after SW verifies all assets
 * are present (not after a blind timeout).
 */
function scheduleBackgroundPrecache(worker: ServiceWorker) {
  // Skip if already fully verified
  if (localStorage.getItem(CACHE_COMPLETE_KEY) === 'true') return;

  const startPrecache = () => {
    // Complete asset manifest for 100% offline guarantee
    const allAssets = [
      ...PRELOAD_IMAGES,
      '/countries.geojson',
      '/india_states.geojson',
      '/data/mountains.json',
      '/data/rivers.json',
      '/data/external_borders.json',
      '/data/internal_borders.json',
      '/parchment-texture.png',
      '/textures/noise.png',
      '/textures/paper.png',
      '/textures/mountain-texture.png',
      '/manifest.json',
      '/favicon.png',
    ];

    // Send to service worker for background caching
    worker.postMessage({
      type: 'PRECACHE_ASSETS',
      urls: allAssets,
    });

    // Note: CACHE_COMPLETE_KEY is now set by the message handler
    // when SW confirms all assets are verified, NOT by a blind timeout
  };

  // Use requestIdleCallback if available, else setTimeout
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(startPrecache, { timeout: 5000 });
  } else {
    setTimeout(startPrecache, 3000);
  }
}
