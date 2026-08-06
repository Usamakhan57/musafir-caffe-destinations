import React from "react";
import CommunityHero from "@/features/community/components/hero";
import CommunityStats from "@/features/community/components/stats";
import FeaturedTravelers from "@/features/community/components/featured-travelers";
import StoriesFeed from "@/features/community/components/stories";
import Meetups from "@/features/community/components/meetups";
import DiscussionCategories from "@/features/community/components/discussions";
import Leaderboard from "@/features/community/components/leaderboard";
import Badges from "@/features/community/components/badges";
import JoinCTA from "@/features/community/components/join-cta";

export default function CommunityPage() {
  return (
    <main className="bg-white">
      <CommunityHero />
      <div className="-mt-[120px]">
        <CommunityStats />
      </div>

      <section className="mx-auto max-w-[1400px] px-6 pt-10">
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
