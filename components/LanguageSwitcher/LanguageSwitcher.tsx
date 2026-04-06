'use client';

import { useLanguageStore } from "@/store/languageStore";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  return (
    <div className="lang-switch">
      {["en", "kn", "hi"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l as "en" | "kn" | "hi")}
          className={lang === l ? "active" : ""}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}