'use client';

import { useEffect } from 'react';

/**
 * ViewportStabilizer
 * 
 * Objectives:
 * 1. Calculate real viewport height using window.innerHeight (Objective 1)
 * 2. Store as CSS variable (--app-height) (Objective 1)
 * 3. Update on resize, orientation change (Objective 1)
 * 4. Apply safe-area-inset handling (Objective 6)
 */
export default function ViewportStabilizer() {
  useEffect(() => {
    const updateHeight = () => {
      // Use window.innerHeight to get the actual visible height (accounting for toolbar on mobile)
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // Initial calculation
    updateHeight();

    // Listen for resize and orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return null;
}
