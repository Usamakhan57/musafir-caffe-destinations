import "server-only";

import {
  readCafeBySlug,
  readCafeSlugs,
  readCafes,
  readNearbyCafes,
} from "@/server/catalog/read";

import { getFilterOptions } from "./cafes-store";

export { getFilterOptions };

export async function getAllCafes() {
  return readCafes();
}

export async function getCafeBySlug(slug: string) {
  return readCafeBySlug(slug);
}

export async function getCafeSlugs() {
  return readCafeSlugs();
}

export async function getNearbyCafes(slugs: readonly string[]) {
  return readNearbyCafes(slugs);
}
