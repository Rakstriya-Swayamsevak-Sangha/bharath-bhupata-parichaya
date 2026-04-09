'use client';

import React from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { UI_TEXT } from '@/data/uiText';
import { Search } from '@/components/Search/Search';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Header() {
  const { lang } = useLanguageStore();
  const title = UI_TEXT.headerTitle[lang];

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title-standard">
          <span className="title-line">Bharath Bhupata</span>
          <span className="title-line">Parichaya</span>
        </h1>
        
        <div className="header-right-cluster">
          <Search />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
