'use client';

import React, { useState } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { Search } from '@/components/Search/Search';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { UI_TEXT } from '@/data/uiText';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { lang } = useLanguageStore();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title-standard">
          <span className="title-line">{UI_TEXT.headerTitleLine1[lang]}</span>
          <span className="title-line">{UI_TEXT.headerTitleLine2[lang]}</span>
        </h1>

        <div className="header-center flex-grow">
          <Search />
        </div>

        <div className="header-actions flex-shrink-0">
          <button 
            className="help-trigger"
            onClick={() => setShowHelp(!showHelp)}
            title="Help & About"
            aria-label="Help and About"
          >
            {showHelp ? <X size={18} /> : <Info size={18} />}
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="help-dropdown"
          >
            <div className="help-content">
              <h3>Darshan Guidance</h3>
              <p>Explore the cultural geography of Akhand Bharat through sacred mountains, rivers, and cities.</p>
              <div className="install-hint">
                <strong>Offline Access:</strong> Use browser menu → Install App for full offline experience.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
