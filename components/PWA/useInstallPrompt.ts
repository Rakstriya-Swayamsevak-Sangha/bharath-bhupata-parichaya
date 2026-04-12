'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * INVISIBLE INSTALL PROMPT SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Captures the `beforeinstallprompt` event and defers it for programmatic
 * triggering on CTA click. Handles platform detection for iOS guidance.
 * 
 * RULES:
 *   - NEVER shows intrusive popups
 *   - NEVER blocks user flow
 *   - Only triggers on explicit CTA interaction
 *   - Remembers install state permanently
 * ═══════════════════════════════════════════════════════════════════════════════
 */

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

interface InstallState {
  /** Whether the native install prompt is available (Android/Desktop Chrome) */
  canInstall: boolean;
  /** Whether the app is already installed as standalone */
  isInstalled: boolean;
  /** Whether this is iOS Safari (requires manual add-to-home guidance) */
  isIOSSafari: boolean;
  /** Whether the user has already been shown iOS guidance */
  iosGuidanceShown: boolean;
  /** Trigger the native install prompt. Returns true if accepted. */
  triggerInstall: () => Promise<boolean>;
  /** Mark iOS guidance as shown */
  dismissIOSGuidance: () => void;
}

const INSTALL_STATE_KEY = 'bharat-darshan-installed';
const IOS_GUIDANCE_KEY = 'bharat-darshan-ios-guidance-shown';

export function useInstallPrompt(): InstallState {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);
  const [iosGuidanceShown, setIosGuidanceShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─── Check if already installed ──────────────────────────────────────
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    
    const wasInstalled = localStorage.getItem(INSTALL_STATE_KEY) === 'true';
    
    if (isStandalone || wasInstalled) {
      setIsInstalled(true);
      return; // No install logic needed
    }

    // ─── iOS Detection ───────────────────────────────────────────────────
    const ua = window.navigator.userAgent;
    const isIOS = /iP(hone|od|ad)/.test(ua) || 
                  (ua.includes('Mac') && 'ontouchend' in document);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|Chrome/.test(ua);
    
    if (isIOS && isSafari) {
      setIsIOSSafari(true);
      setIosGuidanceShown(localStorage.getItem(IOS_GUIDANCE_KEY) === 'true');
      return;
    }

    // ─── Android / Desktop Chrome: Capture beforeinstallprompt ────────────
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault(); // Prevent automatic mini-infobar
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    // App installed from our prompt
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      deferredPrompt.current = null;
      localStorage.setItem(INSTALL_STATE_KEY, 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt.current) return false;
    
    try {
      await deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setCanInstall(false);
        localStorage.setItem(INSTALL_STATE_KEY, 'true');
        deferredPrompt.current = null;
        return true;
      }
      
      // User dismissed — don't ask again this session
      deferredPrompt.current = null;
      setCanInstall(false);
      return false;
    } catch (err) {
      console.warn('[Install] Prompt failed:', err);
      return false;
    }
  }, []);

  const dismissIOSGuidance = useCallback(() => {
    setIosGuidanceShown(true);
    localStorage.setItem(IOS_GUIDANCE_KEY, 'true');
  }, []);

  return {
    canInstall,
    isInstalled,
    isIOSSafari,
    iosGuidanceShown,
    triggerInstall,
    dismissIOSGuidance,
  };
}
