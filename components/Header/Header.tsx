'use client';

import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { UI_TEXT } from '@/data/uiText';
import { Search } from '@/components/Search/Search';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Header() {
  const { lang } = useLanguageStore();
  const [isMobile, setIsMobile] = useState(false);
  const title = UI_TEXT.headerTitle[lang];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title-standard" title={title}>
          {isMobile ? (
            <>
              <span className="mobile-line1">Bharath Bhupata</span>
              <span className="mobile-line2">Parichaya</span>
            </>
          ) : (
            title
          )}
        </h1>
        
        <div className="header-right-cluster">
          <Search />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
