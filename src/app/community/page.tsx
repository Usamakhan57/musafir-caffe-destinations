import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import CommunityHero from "@/features/community/components/hero";
import CommunityStats from "@/features/community/components/stats";
import FeaturedTravelers from "@/features/community/components/featured-travelers";
import StoriesFeed from "@/features/community/components/stories";
import Meetups from "@/features/community/components/meetups";
import DiscussionCategories from "@/features/community/components/discussions";
import Leaderboard from "@/features/community/components/leaderboard";
import Badges from "@/features/community/components/badges";
import JoinCTA from "@/features/community/components/join-cta";

export const metadata = createPageMetadata({
  title: "Community",
  description:
    "Join the MusafirCaffe community — traveler stories, meetups, discussions, and shared routes from coffee cities worldwide.",
  path: ROUTES.community,
});

export default function CommunityPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Community" }]} />
      </div>
      <CommunityHero />
      <div className="-mt-[100px] sm:-mt-[120px]">
        <CommunityStats />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8 lg:px-12">
        <FeaturedTravelers />
        <StoriesFeed />
        <Meetups />
        <DiscussionCategories />
        <Leaderboard />
        <Badges />
        <JoinCTA />
      </section>
    </main>
  );
}
