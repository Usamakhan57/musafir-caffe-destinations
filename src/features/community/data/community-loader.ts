import "server-only";

import {
  readCommunityPostBySlug,
  readCommunityPostSlugs,
  readCommunityPosts,
  readCommunityPostsBySlugs,
  readCommunityTravelers,
  readFeaturedStories,
  readLatestPosts,
  readPopularTravelers,
  readStoriesByAuthor,
  readTrendingPosts,
  readWeeklyHighlights,
} from "@/server/catalog/read";

import {
  getAllTravelers,
  getCommunityFilterOptions,
  getTravelerBySlug,
  getTravelerForStory,
} from "./community-store";

export {
  getAllTravelers,
  getCommunityFilterOptions,
  getTravelerBySlug,
  getTravelerForStory,
};

export async function getAllStories() {
  return readCommunityPosts();
}

export async function getStoryBySlug(slug: string) {
  return readCommunityPostBySlug(slug);
}

export async function getStorySlugs() {
  return readCommunityPostSlugs();
}

export async function getStoriesBySlugs(slugs: readonly string[]) {
  return readCommunityPostsBySlugs(slugs);
}

export async function getFeaturedStories() {
  return readFeaturedStories();
}

export async function getTrendingPosts() {
  return readTrendingPosts();
}

export async function getLatestPosts(limit = 8) {
  return readLatestPosts(limit);
}

export async function getWeeklyHighlights() {
  return readWeeklyHighlights();
}

export async function getStoriesByAuthor(authorSlug: string) {
  return readStoriesByAuthor(authorSlug);
}

export async function getPopularTravelers(limit = 6) {
  return readPopularTravelers(limit);
}

export async function listTravelers() {
  return readCommunityTravelers();
}
