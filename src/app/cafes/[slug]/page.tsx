import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import {
  CafeHero,
  Gallery,
  AmenitiesSection,
  HighlightsSection,
  ReviewsSection,
  NearbyCafesSection,
  RelatedDestinationsSection,
  AboutStorySection,
  ScoresSection,
  MenuHighlightsSection,
  ContactInfoSection,
  FoodOptionsSection,
  NearbyAttractionsSection,
  MapPlaceholderSection,
  SignatureCoffeeBanner,
} from "@/features/cafes";
import {
  getCafeBySlug,
  getCafeSlugs,
  getNearbyCafes,
} from "@/features/cafes/data/cafes-loader";

interface CafePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCafeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CafePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cafe = await getCafeBySlug(slug);

  if (!cafe) {
    return { title: "Café not found" };
  }

  const title = `${cafe.name} — Café in ${cafe.city}, ${cafe.country}`;
  const description = `${cafe.description} Coffee quality ${cafe.coffeeQualityScore.toFixed(1)}. ${cafe.signatureCoffee}.`;
  const url = `${siteConfig.url}/cafes/${cafe.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: cafe.heroImage, alt: `${cafe.name} in ${cafe.city}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cafe.heroImage],
    },
  };
}

export default async function CafePage({ params }: CafePageProps) {
  const { slug } = await params;
  const cafe = await getCafeBySlug(slug);

  if (!cafe) {
    notFound();
  }

  const nearby = await getNearbyCafes(cafe.nearbySlugs);
  const pageUrl = `${siteConfig.url}/cafes/${cafe.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: cafe.name,
    description: cafe.description,
    image: [cafe.heroImage, ...cafe.gallery.map((image) => image.src)],
    url: pageUrl,
    telephone: cafe.phone,
    email: cafe.email,
    servesCuisine: cafe.foodOptions,
    priceRange: cafe.priceLevel,
    openingHours: cafe.openingHours,
    address: {
      "@type": "PostalAddress",
      streetAddress: cafe.address,
      addressLocality: cafe.city,
      addressCountry: cafe.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cafe.map.lat,
      longitude: cafe.map.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: cafe.rating,
      reviewCount: cafe.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: cafe.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col overflow-x-hidden">
        <CafeHero cafe={cafe} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-14 sm:gap-20 sm:px-8 sm:py-20 lg:px-12">
          <AboutStorySection cafe={cafe} />
          <SignatureCoffeeBanner cafe={cafe} />
          <ScoresSection cafe={cafe} />

          <section aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
            >
              Gallery
            </h2>
            <div className="mt-6">
              <Gallery images={cafe.gallery} />
            </div>
          </section>

          <MenuHighlightsSection items={cafe.menuHighlights} signature={cafe.signatureCoffee} />
          <ContactInfoSection cafe={cafe} />
          <AmenitiesSection cafe={cafe} />
          <FoodOptionsSection options={cafe.foodOptions} />
          <HighlightsSection cafe={cafe} />
          <NearbyAttractionsSection attractions={cafe.nearbyAttractions} />
          <MapPlaceholderSection cafe={cafe} />
          <ReviewsSection cafe={cafe} />
          <NearbyCafesSection cafes={nearby} />
          <RelatedDestinationsSection slugs={cafe.relatedDestinationSlugs} />
        </div>
      </main>
    </>
  );
}
