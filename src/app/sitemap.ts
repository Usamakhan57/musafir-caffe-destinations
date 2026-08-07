import type { MetadataRoute } from "next";

import { siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { getHelpArticleSlugs } from "@/features/content/help-articles";
import { getCafeSlugs } from "@/features/cafes/data/cafes-loader";
import { getDestinationSlugs } from "@/features/destinations/data/destinations-loader";
import { getGuideSlugs } from "@/features/guides/data/guides-loader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    ROUTES.home,
    ROUTES.destinations,
    ROUTES.cafes,
    ROUTES.guides,
    ROUTES.community,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.faq,
    ROUTES.help,
    ROUTES.careers,
    ROUTES.press,
    ROUTES.privacy,
    ROUTES.terms,
    ROUTES.cookies,
    ROUTES.travelTips,
    ROUTES.digitalNomads,
    ROUTES.planner,
    ROUTES.search,
    ROUTES.maps,
    ROUTES.budget,
    ROUTES.hotels,
    ROUTES.flights,
    ROUTES.tours,
    ROUTES.gear,
    ROUTES.membership,
    ROUTES.affiliate,
  ].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const [destinations, cafes, guides, helpSlugs] = await Promise.all([
    getDestinationSlugs(),
    getCafeSlugs(),
    getGuideSlugs(),
    Promise.resolve(getHelpArticleSlugs()),
  ]);

  return [
    ...staticRoutes,
    ...destinations.map((slug) => ({
      url: `${base}/destinations/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cafes.map((slug) => ({
      url: `${base}/cafes/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...guides.map((slug) => ({
      url: `${base}/guides/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...helpSlugs.map((slug) => ({
      url: `${base}/help/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
