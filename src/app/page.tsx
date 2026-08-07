import {
  Hero,
  PremiumCards,
  HeroStats,
  FeaturedDestinations,
  FeaturedCafes,
  TravelGuides,
  AiTripPlanner,
  CommunityStories,
  Testimonials,
  Newsletter,
} from "@/features/home";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#FCFAF7]">
      <Hero />
      <PremiumCards />
      <HeroStats />
      <FeaturedDestinations />
      <FeaturedCafes />
      <TravelGuides />
      <AiTripPlanner />
      <CommunityStories />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
