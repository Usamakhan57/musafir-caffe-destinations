import type { MetadataRoute } from "next";

import { siteConfig } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "MusafirCaffe",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF9",
    theme_color: "#0F766E",
    lang: "en",
    icons: [
      {
        src: "/musafircaffe-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/musafircaffe-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["travel", "lifestyle", "food"],
  };
}
