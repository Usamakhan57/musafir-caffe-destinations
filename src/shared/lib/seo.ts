import type { Metadata } from "next";

import { siteConfig } from "@/config";

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/** Build consistent title, description, Open Graph, and Twitter metadata. */
export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: image, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
