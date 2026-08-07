import {
  Hero,
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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#FAFAF9]">
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
