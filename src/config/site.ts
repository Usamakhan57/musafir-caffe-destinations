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
  ogImage: `${env.appUrl}/musafircaffe-logo.png`,
  links: {
    facebook: "https://facebook.com/musafircaffe",
    instagram: "https://instagram.com/musafircaffe",
    x: "https://x.com/musafircaffe",
    youtube: "https://youtube.com/@musafircaffe",
  },
} as const;

export type SiteConfig = typeof siteConfig;
