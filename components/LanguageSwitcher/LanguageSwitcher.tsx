'use client';

import { useLanguageStore } from "@/store/languageStore";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  return (
    <div className="lang-switch">
      {["en", "kn", "hi"].map((l) => (
        <motion.button
          key={l}
          whileTap={{ scale: 0.97 }}
          onClick={() => setLang(l as "en" | "kn" | "hi")}
          className={lang === l ? "active" : ""}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {l.toUpperCase()}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}