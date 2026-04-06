import { create } from "zustand";

type LanguageState = {
  lang: "en" | "kn" | "hi";
  setLang: (lang: "en" | "kn" | "hi") => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang })
}));