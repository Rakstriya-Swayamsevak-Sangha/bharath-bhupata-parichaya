'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguageStore } from '@/store/languageStore';
import { Search } from '@/components/Search/Search';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { useInstallPrompt } from '@/components/PWA/useInstallPrompt';
import { IOSInstallGuidance } from '@/components/PWA/IOSInstallGuidance';
import { Download } from 'lucide-react';

export function Header() {
  const { lang } = useLanguageStore();
  const pathname = usePathname();

  // ─── Install UX State System ─────────────────────────────────
  const { status, triggerInstall, isInstalled } = useInstallPrompt();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);

  // Entrance Control: Wait for museum atmosphere to settle (2s)
  useEffect(() => {
    const timer = setTimeout(() => setIsReadyToDisplay(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInstallClick = () => {
    if (status === 'READY') {
      triggerInstall();
    } else if (status === 'IOS_GUIDE') {
      setShowIOSGuide(true);
    }
  };

  // Determine Label based on State (Desktop Only)
  const getInstallLabel = () => {
    if (status === 'PREPARING') return 'Preparing...';
    if (status === 'READY') return 'Install';
    if (status === 'IOS_GUIDE') return 'Save Darshan';
    return '';
  };

  // Determine Accessibility Label
  const getAriaLabel = () => {
    if (status === 'PREPARING') return 'Preparing installation system';
    if (status === 'READY') return 'Install Bharatvarsha App';
    return 'Installation Options';
  };

  // Visibility Logic
  const shouldShow = isReadyToDisplay && !isInstalled && status !== 'INSTALLED';

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title-standard">
          <span className="title-line">Bharata Bhupata</span>
          <span className="title-line">Parichaya</span>
        </h1>

        <div className="header-center flex-grow">
          <Search />
        </div>

        <div className="header-actions flex-shrink-0">
          {shouldShow && (
            <button
              className={`install-button-header state-${status.toLowerCase()}`}
              onClick={handleInstallClick}
              aria-label={getAriaLabel()}
              aria-disabled={status === 'PREPARING'}
              style={{
                opacity: status === 'PREPARING' ? 0.6 : 1,
                cursor: status === 'READY' || status === 'IOS_GUIDE' ? 'pointer' : 'default',
                pointerEvents: status === 'PREPARING' ? 'none' : 'auto'
              }}
            >
              <Download size={14} strokeWidth={2.5} />
              <span className="label-text">{getInstallLabel()}</span>
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      <IOSInstallGuidance
        visible={showIOSGuide}
        onDismiss={() => setShowIOSGuide(false)}
      />
    </header>
  );
}
