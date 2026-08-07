import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { communityTravelerRoute } from "@/constants";
import { TravelerProfile } from "@/features/community";
import {
  getAllTravelers,
  getStoriesByAuthor,
  getTravelerBySlug,
} from "@/features/community/data/community-loader";

interface TravelerPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTravelers().map((traveler) => ({ slug: traveler.slug }));
}

export async function generateMetadata({
  params,
}: TravelerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const traveler = getTravelerBySlug(slug);

  if (!traveler) {
    return { title: "Traveler not found" };
  }

  const stories = await getStoriesByAuthor(traveler.slug);
  const title = `${traveler.name} — Community Traveler`;
  const description = `${traveler.bio} ${stories.length} published stories on MusafirCaffe.`;
  const url = `${siteConfig.url}${communityTravelerRoute(traveler.slug)}`;

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
      images: [{ url: traveler.avatar, alt: traveler.name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [traveler.avatar],
    },
  };
}

export default async function CommunityTravelerPage({ params }: TravelerPageProps) {
  const { slug } = await params;
  const traveler = getTravelerBySlug(slug);

  if (!traveler) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}${communityTravelerRoute(traveler.slug)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: traveler.name,
    description: traveler.bio,
    image: traveler.avatar,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: traveler.location,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelerProfile slug={slug} />
    </>
  );
}
