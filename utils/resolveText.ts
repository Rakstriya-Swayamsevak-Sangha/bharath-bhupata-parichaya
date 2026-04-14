/**
 * DETERMINISTIC TEXT RESOLVER
 * ====================================
 * Rule: Never pass objects to JSX.
 * Rule: Fallback to 'en' only if requested lang is missing.
 * Rule: Return empty string if nothing found (prevent crash).
 */

export interface MultilingualText {
  en: string;
  kn?: string;
  hi?: string;
  [key: string]: string | undefined;
}

/**
 * Resolves a multilingual object into a string for the current language.
 * Guarantees a string output. No objects allowed in JSX.
 */
export function resolveText(
  field: MultilingualText | string | null | undefined,
  lang: string = 'en'
): string {
  if (!field) return '';
  
  if (typeof field === 'string') return field;
  
  // Try requested language
  const text = field[lang];
  if (typeof text === 'string') return text;
  
  // Fallback to English
  const fallback = field['en'];
  if (typeof fallback === 'string') return fallback;
  
  // Final safeguard: return empty string
  return '';
}
