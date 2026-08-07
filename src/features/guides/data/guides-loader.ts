import "server-only";

import {
  readEditorsPicks,
  readFeaturedGuides,
  readGuideAuthors,
  readGuideBySlug,
  readGuideSlugs,
  readGuides,
  readGuidesByAuthor,
  readGuidesBySlugs,
  readLatestGuides,
  readTrendingGuides,
} from "@/server/catalog/read";

import { getAuthorBySlug, getAuthorForGuide, getGuideFilterOptions } from "./guides-store";

export {
  getAuthorBySlug,
  getAuthorForGuide,
  getGuideFilterOptions,
};

export async function getAllGuides() {
  return readGuides();
}

export async function getGuideBySlug(slug: string) {
  return readGuideBySlug(slug);
}

export async function getGuideSlugs() {
  return readGuideSlugs();
}

export async function getGuidesBySlugs(slugs: readonly string[]) {
  return readGuidesBySlugs(slugs);
}

export async function getFeaturedGuides() {
  return readFeaturedGuides();
}

export async function getTrendingGuides() {
  return readTrendingGuides();
}

export async function getEditorsPicks() {
  return readEditorsPicks();
}

export async function getLatestGuides(limit = 8) {
  return readLatestGuides(limit);
}

export async function getAllAuthors() {
  return readGuideAuthors();
}

export async function getGuidesByAuthor(authorSlug: string) {
  return readGuidesByAuthor(authorSlug);
}
