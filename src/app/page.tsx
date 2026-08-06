import {
  Hero,
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
    <main className="flex flex-1 flex-col bg-white">
      <Hero />
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
