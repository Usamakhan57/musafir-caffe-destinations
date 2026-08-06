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

  const title = `${destination.name}, ${destination.country}`;
  const description = destination.description;
  const url = `${siteConfig.url}/destinations/${destination.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [{ url: destination.heroImage }],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: destination.name,
    description: destination.description,
    image: destination.heroImage,
    address: {
      "@type": "PostalAddress",
      addressCountry: destination.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: destination.rating,
      reviewCount: destination.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col">
        <DestinationHero destination={destination} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-20">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
              About {destination.name}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-coffee-600">
              {destination.longDescription}
            </p>
          </section>

          <section aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
              Gallery
            </h2>
            <div className="mt-6">
              <Gallery images={destination.gallery} />
            </div>
          </section>

          <BestCafesSection cafes={destination.bestCafes} destinationName={destination.name} />
          <ThingsToDoSection activities={destination.thingsToDo} />
          <TravelTipsSection tips={destination.travelTips} />
          <ReviewsSection
            reviews={destination.reviews}
            rating={destination.rating}
            reviewCount={destination.reviewCount}
          />
          <NearbyDestinationsSection destinations={nearby} />

          <DetailCta destinationName={destination.name} />
        </div>
      </main>
    </>
  );
}
