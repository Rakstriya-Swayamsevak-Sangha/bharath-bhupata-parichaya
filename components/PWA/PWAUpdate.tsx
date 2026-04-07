'use client';

import { useEffect } from 'react';

export default function PWAUpdate() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      const { serviceWorker } = navigator;

      const handleControllerChange = () => {
        // When the service worker is updated, reload the page to ensure
        // the user has the latest assets.
        window.location.reload();
      };

      serviceWorker.addEventListener('controllerchange', handleControllerChange);

      return () => {
        serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      };
    }
  }, []);

  return null;
}
