'use client';

import { useEffect } from 'react';

/**
 * ASSET RESOLUTION GUARD — Zero-Tolerance 404 Detection
 * 
 * Listens for failed 'error' events on the window, which catch
 * 404s for images, scripts, and other static assets.
 */
export default function AssetGuard() {
  useEffect(() => {
    const handleAssetError = (event: ErrorEvent | Event) => {
      // Check if the target is an element that loads an external asset
      const target = event.target as HTMLElement;
      
      if (
        target instanceof HTMLImageElement || 
        target instanceof HTMLScriptElement || 
        target instanceof HTMLLinkElement
      ) {
        const url = (target as any).src || (target as any).href;
        if (!url) return;

        // Skip noisy non-critical 404s
        if (url.includes('_vercel/insights')) return;
        if (url.includes('favicon.ico')) return;
        
        // Handle Next.js static chunk version mismatches across deployments
        if (target instanceof HTMLScriptElement && url.includes('/_next/static/chunks/')) {
          console.warn(`[CHUNK_LOAD_ERROR] Outdated chunk requested after new build: ${url}`);
          const lastReload = sessionStorage.getItem('chunk_reload_ts');
          const now = Date.now();
          if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
            sessionStorage.setItem('chunk_reload_ts', now.toString());
            window.location.reload();
            return;
          }
        }

        // Log actual asset failures
        console.warn(`[ASSET_OFFLINE] Resource not in cache or missing: ${url}`);
        
        // Fail-safe: inject fallback for images
        if (target instanceof HTMLImageElement) {
          target.src = '/fallback.svg';
          target.style.opacity = '0.5';
          target.style.filter = 'grayscale(1)';
        }
      }
    };

    // Capture unhandled promise rejections from dynamic chunk imports
    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorMsg = event.reason?.message || String(event.reason || '');
      if (
        errorMsg.includes('Loading chunk') ||
        errorMsg.includes('ChunkLoadError') ||
        errorMsg.includes('Failed to fetch dynamically imported module')
      ) {
        const lastReload = sessionStorage.getItem('chunk_reload_ts');
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
          sessionStorage.setItem('chunk_reload_ts', now.toString());
          window.location.reload();
        }
      }
    };

    // Capture: true ensures we catch the event as it bubbles up from the target
    window.addEventListener('error', handleAssetError, true);
    window.addEventListener('unhandledrejection', handleRejection);
    
    return () => {
      window.removeEventListener('error', handleAssetError, true);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
