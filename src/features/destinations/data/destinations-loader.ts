import "server-only";

import {
  readDestinationBySlug,
  readDestinationSlugs,
  readDestinations,
  readNearbyDestinations,
} from "@/server/catalog/read";

import { getFilterOptions } from "./destinations-store";

export { getFilterOptions };

export async function getAllDestinations() {
  return readDestinations();
}

export async function getDestinationBySlug(slug: string) {
  return readDestinationBySlug(slug);
}

export async function getDestinationSlugs() {
  return readDestinationSlugs();
}

export async function getNearbyDestinations(slugs: readonly string[]) {
  return readNearbyDestinations(slugs);
}
