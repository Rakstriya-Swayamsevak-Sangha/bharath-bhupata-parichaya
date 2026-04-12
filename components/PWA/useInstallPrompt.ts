'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DETERMINISTIC INSTALL STATE SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Manages the transition through three critical PWA phases:
 * 1. PREPARING: Initial state, browser evaluating engagement.
 * 2. READY: Native prompt captured and ready for trigger.
 * 3. INSTALLED: App detected in standalone mode or successful installation.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export type InstallStatus = 'PREPARING' | 'READY' | 'INSTALLED' | 'IOS_GUIDE';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

const INSTALL_STATE_KEY = 'bharat-darshan-installed';

export function useInstallPrompt() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [status, setStatus] = useState<InstallStatus>('PREPARING');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─── 1. Detect Existing Installation ───────────────────────────────
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    
    // Check localStorage fallback for persistence
    const wasInstalled = localStorage.getItem(INSTALL_STATE_KEY) === 'true';

    if (isStandalone || wasInstalled) {
      setStatus('INSTALLED');
      return;
    }

    // ─── 2. iOS Detection ──────────────────────────────────────────────
    const ua = window.navigator.userAgent;
    const isIOS = /iP(hone|od|ad)/.test(ua) || 
                  (ua.includes('Mac') && 'ontouchend' in document);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|Chrome/.test(ua);
    
    if (isIOS && isSafari) {
      setStatus('IOS_GUIDE');
      return;
    }

    // ─── 3. Android / Desktop Chrome: Capture beforeinstallprompt ───────
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setStatus('READY');
    };

    const handleAppInstalled = () => {
      setStatus('INSTALLED');
      localStorage.setItem(INSTALL_STATE_KEY, 'true');
      deferredPrompt.current = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (status !== 'READY' || !deferredPrompt.current) return false;
    
    try {
      await deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      
      if (outcome === 'accepted') {
        setStatus('INSTALLED');
        localStorage.setItem(INSTALL_STATE_KEY, 'true');
        deferredPrompt.current = null;
        return true;
      }
      
      // Keep state as READY if dismissed
      return false;
    } catch (err) {
      console.warn('[Install] System busy or prompt blocked.');
      return false;
    }
  }, [status]);

  return {
    status,
    triggerInstall,
    isInstalled: status === 'INSTALLED'
  };
}
