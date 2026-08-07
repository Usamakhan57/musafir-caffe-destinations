import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading } from "@/shared/ui";

import { getGuideFilterOptions, getAllGuides } from "../data/guides-loader";

const COUNTRY_IMAGES: Record<string, string> = {
  Türkiye:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
  Japan:
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop",
  Ethiopia:
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop",
  Australia:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  Portugal:
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop",
  Austria:
    "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=800&auto=format&fit=crop",
  Thailand:
    "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=800&auto=format&fit=crop",
  Vietnam:
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
  Colombia:
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop",
  France:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
  "South Africa":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=800&auto=format&fit=crop",
  Guatemala:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
};

export default async function CountryExplorer() {
  const options = getGuideFilterOptions();
  const all = await getAllGuides();
  const countries = options.countries.slice(0, 8);

  return (
    <section className="mt-16" aria-labelledby="country-explorer-heading">
      <SectionHeading
        id="country-explorer-heading"
        eyebrow="Explore"
        title="Country guides for coffee-focused journeys"
        description="Jump into curated travel stories and café recommendations for each region."
        align="left"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {countries.map((name) => {
          const count = all.filter((g) => g.country === name).length;
          return (
            <Link
              key={name}
              href={`${ROUTES.guides}?country=${encodeURIComponent(name)}#browse-guides`}
              className="card-hover group overflow-hidden rounded-3xl bg-white shadow-card transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              <article>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={
                      COUNTRY_IMAGES[name] ??
                      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
                    }
                    alt=""
                    fill
                    sizes="(min-width:1024px) 320px, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-coffee-900">{name}</h3>
                  <p className="text-sm leading-6 text-coffee-600">
                    {count} {count === 1 ? "guide" : "guides"} for coffee-focused travel.
                  </p>
                  <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                    See guides
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
