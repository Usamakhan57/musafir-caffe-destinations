import { APP_DESCRIPTION, APP_NAME } from "@/constants";

import { env } from "./env";

/**
 * Static site-wide configuration.
 * Consumed by metadata, SEO, and layout components.
 */
export const siteConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: env.appUrl,
  links: {
    // External links (socials, etc.) go here.
  },
} as const;

export type SiteConfig = typeof siteConfig;
