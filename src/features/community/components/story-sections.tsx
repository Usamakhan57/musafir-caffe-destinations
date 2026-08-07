import { Suspense } from "react";

import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import {
  getAllStories,
  getCommunityFilterOptions,
  getTravelerForStory,
} from "../data/community-loader";
import {
  COMMUNITY_PAGE_SIZE,
  filterStories,
  paginate,
  parseCommunityFilters,
  sortStories,
} from "../lib/query";
import type { CommunityFilters } from "../types";
import { CommunityEmptyState, CommunitySkeleton } from "./community-empty-state";
import { CommunityPagination } from "./community-pagination";
import { CommunityToolbar } from "./community-toolbar";
import StoryCard from "./story-card";

function hasActiveFilters(filters: CommunityFilters) {
  return Boolean(
    filters.search ||
      filters.category ||
      filters.country ||
      filters.destination ||
      filters.traveler ||
      filters.coffee ||
      filters.tag,
  );
}

interface BrowseStoriesSectionProps {
  searchParams: Record<string, string | string[] | undefined>;
}

async function BrowseStoriesInner({ searchParams }: BrowseStoriesSectionProps) {
  const filters = parseCommunityFilters(searchParams);
  const all = await getAllStories();
  const options = getCommunityFilterOptions();
  const filtered = filterStories(all, filters);
  const sorted = sortStories(filtered, filters.sort);
  const { items, page, totalPages } = paginate(sorted, filters.page, COMMUNITY_PAGE_SIZE);

  return (
    <>
      <CommunityToolbar
        filters={{ ...filters, page }}
        options={options}
        resultCount={filtered.length}
      />

      {items.length === 0 ? (
        <div className="mt-10">
          <CommunityEmptyState hasActiveFilters={hasActiveFilters(filters)} />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((story, index) => (
            <StoryCard
              key={story.slug}
              story={story}
              author={getTravelerForStory(story)}
              priority={index < 3}
            />
          ))}
        </div>
      )}

      <CommunityPagination filters={{ ...filters, page }} totalPages={totalPages} />
    </>
  );
}

export function BrowseStoriesSection({ searchParams }: BrowseStoriesSectionProps) {
  return (
    <section id="browse-stories" className="mt-12 scroll-mt-24" aria-labelledby="browse-stories-heading">
      <SectionHeading
        id="browse-stories-heading"
        eyebrow="Browse"
        title="Search every traveler story"
        description="Filter by traveler, country, destination, coffee tags, and more."
        align="left"
      />
      <div className="mt-8">
        <Suspense fallback={<CommunitySkeleton />}>
          <BrowseStoriesInner searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export async function FeaturedStoriesSection() {
  const stories = (await getAllStories()).filter((s) => s.featured).slice(0, 6);
  if (stories.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="featured-stories-heading">
      <SectionHeading
        id="featured-stories-heading"
        eyebrow="Featured Stories"
        title="Standout journeys from the community"
        description="Editor-highlighted posts with the cafés, budgets, and tips travelers ask for most."
        align="left"
      />
      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
        {stories.map((story, index) => (
          <StaggerItem key={story.slug}>
            <StoryCard
              story={story}
              author={getTravelerForStory(story)}
              priority={index < 2}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export async function TrendingPostsSection() {
  const stories = (await getAllStories()).filter((s) => s.trending).slice(0, 6);
  if (stories.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="trending-posts-heading">
      <SectionHeading
        id="trending-posts-heading"
        eyebrow="Trending"
        title="Posts travelers are sharing right now"
        description="High-engagement stories climbing the community feed this week."
        align="left"
      />
      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
        {stories.map((story) => (
          <StaggerItem key={story.slug}>
            <StoryCard story={story} author={getTravelerForStory(story)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export async function LatestPostsSection() {
  const stories = [...(await getAllStories())]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);
  if (stories.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="latest-posts-heading">
      <SectionHeading
        id="latest-posts-heading"
        eyebrow="Latest"
        title="Fresh posts from the feed"
        description="Newly published traveler stories across every category."
        align="left"
      />
      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
        {stories.map((story) => (
          <StaggerItem key={story.slug}>
            <StoryCard story={story} author={getTravelerForStory(story)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export async function WeeklyHighlightsSection() {
  const stories = (await getAllStories()).filter((s) => s.weeklyHighlight).slice(0, 4);
  if (stories.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="weekly-highlights-heading">
      <SectionHeading
        id="weekly-highlights-heading"
        eyebrow="Weekly Highlights"
        title="This week’s community picks"
        description="A short list of journeys worth reading before your next trip."
        align="left"
      />
      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2" staggerDelay={0.1}>
        {stories.map((story) => (
          <StaggerItem key={story.slug}>
            <StoryCard story={story} author={getTravelerForStory(story)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
