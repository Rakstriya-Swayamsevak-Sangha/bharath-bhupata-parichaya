'use client';

import React from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { UI_TEXT } from '@/data/uiText';
import { Search } from '@/components/Search/Search';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Header() {
  const { lang } = useLanguageStore();

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title-standard" title={UI_TEXT.headerTitle[lang]}>
          {UI_TEXT.headerTitle[lang]}
        </h1>
        
        <div className="header-right-cluster">
          <Search />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
