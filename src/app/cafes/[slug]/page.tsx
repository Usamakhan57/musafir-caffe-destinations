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
  getCafeBySlug,
  getCafeSlugs,
  getNearbyCafes,
} from "@/features/cafes";

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

  const title = `${cafe.name}, ${cafe.city}`;
  const description = cafe.description;
  const url = `${siteConfig.url}/cafes/${cafe.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [{ url: cafe.heroImage }],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: cafe.name,
    description: cafe.description,
    image: cafe.heroImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: cafe.city,
      addressCountry: cafe.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: cafe.rating,
      reviewCount: cafe.reviewCount,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex flex-1 flex-col">
        <CafeHero cafe={cafe} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-20">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
              About {cafe.name}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-coffee-600">{cafe.longDescription}</p>
          </section>

          <section aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
              Gallery
            </h2>
            <div className="mt-6">
              <Gallery images={cafe.gallery} />
            </div>
          </section>

          <AmenitiesSection cafe={cafe} />
          <HighlightsSection cafe={cafe} />
          <ReviewsSection cafe={cafe} />
          <NearbyCafesSection cafes={nearby} />
          <RelatedDestinationsSection slugs={cafe.relatedDestinationSlugs} />
        </div>
      </main>
    </>
  );
}
