import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading } from "@/shared/ui";

import { COMMUNITY_CATEGORIES } from "../types";

const CATEGORY_IMAGES: Record<string, string> = {
  "Solo Travel":
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
  Couples:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
  Family:
    "https://images.unsplash.com/photo-1511895426328-dc871419130a?q=80&w=800&auto=format&fit=crop",
  Luxury:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  Budget:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  "Digital Nomads":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  "Coffee Lovers":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  "Hidden Gems":
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop",
  "Road Trips":
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
  "Weekend Escapes":
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
};

export function CommunityCategories() {
  return (
    <section className="mt-10" aria-labelledby="community-categories-heading">
      <SectionHeading
        id="community-categories-heading"
        eyebrow="Categories"
        title="Find stories for every kind of journey"
        description="Browse community posts by travel style, pace, and coffee culture."
        align="left"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {COMMUNITY_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`${ROUTES.community}?category=${encodeURIComponent(category)}#browse-stories`}
            className="card-hover group overflow-hidden rounded-3xl bg-white shadow-card transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <article>
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Solo Travel"]}
                  alt=""
                  fill
                  sizes="(min-width:1280px) 20vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-base font-semibold text-coffee-900">{category}</h3>
                <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Explore
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
