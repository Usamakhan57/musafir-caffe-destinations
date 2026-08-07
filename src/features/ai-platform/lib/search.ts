import {
  cafeRoute,
  communityStoryRoute,
  communityTravelerRoute,
  destinationRoute,
  guideRoute,
} from "@/constants";
import { getAllCafes } from "@/features/cafes";
import { getAllStories, getAllTravelers } from "@/features/community";
import { getAllDestinations } from "@/features/destinations";
import { getAllGuides } from "@/features/guides";

import type { SearchResultItem } from "../types";

export const TRENDING_SEARCHES = [
  "Lisbon cafés",
  "Kyoto temples",
  "Digital nomad Chiang Mai",
  "Ethiopian coffee ceremony",
  "Vienna coffeehouse",
  "Melbourne laneways",
] as const;

export async function buildSearchIndex(): Promise<SearchResultItem[]> {
  const [destinations, cafes, guides, stories] = await Promise.all([
    getAllDestinations(),
    getAllCafes(),
    getAllGuides(),
    getAllStories(),
  ]);
  const travelers = getAllTravelers();

  const items: SearchResultItem[] = [];

  for (const d of destinations) {
    items.push({
      id: `destination:${d.slug}`,
      type: "destination",
      title: d.name,
      subtitle: `${d.city}, ${d.country}`,
      href: destinationRoute(d.slug),
      image: d.heroImage,
      tags: [d.category, d.country, "destination"],
    });
  }

  for (const c of cafes) {
    items.push({
      id: `cafe:${c.slug}`,
      type: "cafe",
      title: c.name,
      subtitle: `${c.city}, ${c.country}`,
      href: cafeRoute(c.slug),
      image: c.heroImage,
      tags: [c.coffeeType, c.category, "café", "coffee"],
    });
  }

  for (const g of guides) {
    items.push({
      id: `guide:${g.slug}`,
      type: "guide",
      title: g.title,
      subtitle: `${g.destination} · ${g.category}`,
      href: guideRoute(g.slug),
      image: g.coverImage,
      tags: [...g.tags, g.category, "guide"],
    });
  }

  for (const s of stories) {
    items.push({
      id: `story:${s.slug}`,
      type: "story",
      title: s.title,
      subtitle: `${s.destination} · Community story`,
      href: communityStoryRoute(s.slug),
      image: s.coverImage,
      tags: [...s.tags, ...s.coffeeTags, "community", "story"],
    });
  }

  for (const t of travelers) {
    items.push({
      id: `traveler:${t.slug}`,
      type: "traveler",
      title: t.name,
      subtitle: t.location,
      href: communityTravelerRoute(t.slug),
      image: t.avatar,
      tags: ["traveler", ...t.visitedCountries.slice(0, 3)],
    });
  }

  return items;
}

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
