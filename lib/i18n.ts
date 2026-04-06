import { sacredCities as enSacredCities } from "@/content/en/sacredCities";
import { sacredCities as knSacredCities } from "@/content/kn/sacredCities";
import { sacredCities as hiSacredCities } from "@/content/hi/sacredCities";
import { mountains as enMountains } from "@/content/en/mountains";
import { mountains as knMountains } from "@/content/kn/mountains";
import { mountains as hiMountains } from "@/content/hi/mountains";
import { rivers as enRivers } from "@/content/en/rivers";
import { rivers as knRivers } from "@/content/kn/rivers";
import { rivers as hiRivers } from "@/content/hi/rivers";

export const languages = {
  en: {
    sacredCities: enSacredCities,
    mountains: enMountains,
    rivers: enRivers
  },
  kn: {
    sacredCities: knSacredCities,
    mountains: knMountains,
    rivers: knRivers
  },
  hi: {
    sacredCities: hiSacredCities,
    mountains: hiMountains,
    rivers: hiRivers
  }
};

export type Lang = "en" | "kn" | "hi";

export function getContent(lang: Lang) {
  return languages[lang];
}