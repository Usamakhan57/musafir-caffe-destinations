import { Suspense } from "react";

import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import {
  Badges,
  BrowseStoriesSection,
  CommunityCategories,
  CommunityHero,
  CommunitySearch,
  CommunityStats,
  DiscussionCategories,
  FeaturedTravelers,
  JoinCTA,
  LatestPostsSection,
  Leaderboard,
  Meetups,
  StoriesFeed,
  TrendingPostsSection,
  WeeklyHighlightsSection,
} from "@/features/community";

export const metadata = createPageMetadata({
  title: "Community",
  description:
    "Join the MusafirCaffe community — traveler stories, meetups, discussions, and shared routes from coffee cities worldwide.",
  path: ROUTES.community,
});

interface CommunityPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="overflow-x-hidden bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Community" }]} />
      </div>
      <CommunityHero />
      <div className="-mt-[100px] sm:-mt-[120px]">
        <CommunityStats />
      </div>

      <div className="mx-auto mt-6 max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <CommunitySearch />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8 lg:px-12">
        <CommunityCategories />
        <StoriesFeed />
        <TrendingPostsSection />
        <LatestPostsSection />
        <FeaturedTravelers />
        <WeeklyHighlightsSection />
        <Suspense fallback={null}>
          <BrowseStoriesSection searchParams={resolvedSearchParams} />
        </Suspense>
        <Meetups />
        <DiscussionCategories />
        <Leaderboard />
        <Badges />
        <JoinCTA />
      </section>
    </main>
  );
}
