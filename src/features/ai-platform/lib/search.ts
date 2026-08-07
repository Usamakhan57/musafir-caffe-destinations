import {
  cafeRoute,
  communityStoryRoute,
  communityTravelerRoute,
  destinationRoute,
  guideRoute,
} from "@/constants";
import { getAllCafes } from "@/features/cafes/data/cafes-loader";
import { getAllStories, getAllTravelers } from "@/features/community/data/community-loader";
import { getAllDestinations } from "@/features/destinations/data/destinations-loader";
import { getAllGuides } from "@/features/guides/data/guides-loader";

import type { SearchResultItem } from "../types";

export {
  TRENDING_SEARCHES,
  searchIndex,
  getSuggestions,
  readRecentSearches,
  pushRecentSearch,
} from "./search-client";

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
