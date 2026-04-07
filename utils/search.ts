import { SearchItem, SEARCH_INDEX } from "../data/searchIndex";

type Language = "en" | "kn" | "hi";

export interface SearchResult extends SearchItem {
  score: number;
}

/**
 * Normalizes a string for search: lowercase and trimmed.
 */
function normalize(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Simple Levenshtein distance for fuzzy matching.
 */
function levenshtein(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;

  const row = Array.from({ length: s1.length + 1 }, (_, i) => i);
  for (let i = 1; i <= s2.length; i++) {
    let prev = i;
    for (let j = 1; j <= s1.length; j++) {
      const val = s2[i - 1] === s1[j - 1] ? row[j - 1] : Math.min(row[j - 1], row[j], prev) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[s1.length] = prev;
  }
  return row[s1.length];
}

/**
 * Computes a similarity score (0 to 1) based on distance.
 */
function similarity(s1: string, s2: string): number {
  const dist = levenshtein(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  return 1.0 - dist / maxLen;
}

/**
 * The core search function.
 */
export function search(query: string, lang: Language = "en"): SearchResult[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalize(query);
  const results: SearchResult[] = [];

  for (const item of SEARCH_INDEX) {
    let score = 0;

    // 1. Title Match (Weight: 5)
    const titleEN = normalize(item.title.en);
    const titleKN = normalize(item.title.kn);
    const titleHI = normalize(item.title.hi);

    const titleLang = normalize(item.title[lang]);

    // Exact match in current language gets highest boost
    if (titleLang === normalizedQuery) {
      score += 10 * 5;
    } else if (titleLang.includes(normalizedQuery)) {
      score += 5 * 5;
    } else if (similarity(titleLang, normalizedQuery) > 0.8) {
      score += 3 * 5;
    }

    // Also check other titles (in case user searches in a different language than UI)
    if (lang !== "en" && titleEN.includes(normalizedQuery)) score += 2 * 5;
    if (lang !== "kn" && titleKN.includes(normalizedQuery)) score += 2 * 5;
    if (lang !== "hi" && titleHI.includes(normalizedQuery)) score += 2 * 5;

    // 2. Keyword Match (Weight: 3)
    let keywordScore = 0;
    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword === normalizedQuery) {
        keywordScore = Math.max(keywordScore, 5);
      } else if (normalizedKeyword.includes(normalizedQuery)) {
        keywordScore = Math.max(keywordScore, 3);
      } else if (similarity(normalizedKeyword, normalizedQuery) > 0.7) {
        keywordScore = Math.max(keywordScore, 1);
      }
    }
    score += keywordScore * 3;

    // 3. Importance (Weight: 2)
    score += item.importance * 2;

    if (score > (item.importance * 2) + 2) {
      results.push({ ...item, score });
    }
  }

  // Sort by score descending, then importance
  return results
    .sort((a, b) => b.score - a.score || b.importance - a.importance)
    .slice(0, 10);
}
