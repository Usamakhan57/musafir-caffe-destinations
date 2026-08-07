import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import {
  DestinationHero,
  Gallery,
  BestCafesSection,
  TravelTipsSection,
  ThingsToDoSection,
  NearbyDestinationsSection,
  ReviewsSection,
  DetailCta,
  OverviewSection,
  HistorySection,
  CoffeeCultureSection,
  AttractionsSection,
  LocalFoodsSection,
  BestTimeSection,
  WeatherSection,
  BudgetEstimatorSection,
  TransportationSection,
  MapPlaceholderSection,
  FaqSection,
  RelatedGuidesSection,
  getDestinationBySlug,
  getDestinationSlugs,
  getNearbyDestinations,
} from "@/features/destinations";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination not found" };
  }

  const title = `${destination.name}, ${destination.country} Travel Guide`;
  const description = `${destination.description} Coffee score ${destination.coffeeScore.toFixed(1)}. Best season: ${destination.bestSeason}.`;
  const url = `${siteConfig.url}/destinations/${destination.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      images: [
        {
          url: destination.heroImage,
          alt: `${destination.name}, ${destination.country}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [destination.heroImage],
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const nearby = await getNearbyDestinations(destination.nearbySlugs);
  const pageUrl = `${siteConfig.url}/destinations/${destination.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${destination.name}, ${destination.country}`,
    description: destination.description,
    image: [destination.heroImage, ...destination.gallery.map((image) => image.src)],
    url: pageUrl,
    touristType: destination.category,
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.map.lat,
      longitude: destination.map.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: destination.city,
      addressCountry: destination.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: destination.rating,
      reviewCount: destination.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col overflow-x-hidden">
        <DestinationHero destination={destination} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-14 sm:gap-20 sm:px-8 sm:py-20 lg:px-12">
          <OverviewSection destination={destination} />

          <section aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
            >
              Gallery
            </h2>
            <div className="mt-6">
              <Gallery images={destination.gallery} />
            </div>
          </section>

          <HistorySection history={destination.history} name={destination.name} />
          <BestCafesSection cafes={destination.bestCafes} destinationName={destination.name} />
          <AttractionsSection attractions={destination.attractions} />
          <ThingsToDoSection activities={destination.thingsToDo} />
          <LocalFoodsSection foods={destination.localFoods} />
          <CoffeeCultureSection
            name={destination.name}
            culture={destination.coffeeCulture}
            story={destination.coffeeCultureStory}
          />
          <BestTimeSection bestSeason={destination.bestSeason} seasons={destination.seasons} />
          <WeatherSection weather={destination.weather} />
          <BudgetEstimatorSection budget={destination.budget} />
          <TransportationSection options={destination.transportation} />
          <MapPlaceholderSection map={destination.map} />
          <TravelTipsSection tips={destination.travelTips} />
          <FaqSection faqs={destination.faqs} />
          <RelatedGuidesSection guides={destination.relatedGuides} />
          <ReviewsSection
            reviews={destination.reviews}
            rating={destination.rating}
            reviewCount={destination.reviewCount}
            targetId={destination.slug}
            targetName={destination.name}
          />
          <NearbyDestinationsSection destinations={nearby} />
          <DetailCta destinationName={destination.name} />
        </div>
      </main>
    </>
  );
}
