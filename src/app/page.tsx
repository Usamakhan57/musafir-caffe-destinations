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

/** Temporarily disable static homepage caching so production always serves the latest Hero/UI. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#FAFAF9]">
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
