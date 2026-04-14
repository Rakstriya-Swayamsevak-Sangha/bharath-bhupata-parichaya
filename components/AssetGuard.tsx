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

    // Capture: true ensures we catch the event as it bubbles up from the target
    window.addEventListener('error', handleAssetError, true);
    
    return () => {
      window.removeEventListener('error', handleAssetError, true);
    };
  }, []);

  return null;
}
