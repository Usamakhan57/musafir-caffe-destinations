import type { SearchResultItem } from "../types";

export const TRENDING_SEARCHES = [
  "Lisbon cafés",
  "Kyoto temples",
  "Digital nomad Chiang Mai",
  "Ethiopian coffee ceremony",
  "Vienna coffeehouse",
  "Melbourne laneways",
] as const;

export function searchIndex(
  items: readonly SearchResultItem[],
  query: string,
  type?: SearchResultItem["type"] | "all",
): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  const filtered = items.filter((item) => {
    if (type && type !== "all" && item.type !== type) return false;
    if (!q) return true;
    const haystack = `${item.title} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });

  return filtered.slice(0, 40);
}

export function getSuggestions(
  items: readonly SearchResultItem[],
  query: string,
): SearchResultItem[] {
  if (!query.trim()) return [];
  return searchIndex(items, query).slice(0, 8);
}

const RECENT_KEY = "musafir:recent-searches";

export function readRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function pushRecentSearch(query: string): string[] {
  const q = query.trim();
  if (!q || typeof window === "undefined") return readRecentSearches();
  const next = [q, ...readRecentSearches().filter((item) => item.toLowerCase() !== q.toLowerCase())].slice(0, 8);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}
