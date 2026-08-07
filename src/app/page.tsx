import { Hero } from "@/features/home/components/hero";
import {
  FeaturedDestinations,
  FeaturedCafes,
  ExploreContinents,
  TravelGuides,
  WhyMusafir,
  DigitalNomad,
  CommunityStories,
  Newsletter,
  DownloadApp,
} from "@/features/home";
import { ROUTES } from "@/constants";
import { createPageMetadata } from "@/shared/lib/seo";

/** Temporarily disable static homepage caching so production always serves the latest Hero/UI. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = createPageMetadata({
  title: "Where Travelers Meet Over Coffee",
  description:
    "MusafirCaffe is the gathering place for curious travelers. Discover legendary cafés, hidden coffee towns, and road-tested travel guides — brewed by a global community.",
  path: ROUTES.home,
});

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      {/* Homepage Hero: premium split layout (src/features/home/components/hero.tsx) — no image overlay. */}
      <Hero />
      <FeaturedDestinations />
      <FeaturedCafes />
      <ExploreContinents />
      <TravelGuides />
      <WhyMusafir />
      <DigitalNomad />
      <CommunityStories />
      <Newsletter />
      <DownloadApp />
    </main>
  );
}
