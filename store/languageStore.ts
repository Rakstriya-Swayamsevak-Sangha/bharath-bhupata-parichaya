import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageState = {
  lang: "en" | "kn" | "hi";
  setLang: (lang: "en" | "kn" | "hi") => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "bharat-darshana-lang",
    }
  )
);