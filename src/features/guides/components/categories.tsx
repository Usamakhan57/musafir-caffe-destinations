import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading } from "@/shared/ui";

import { GUIDE_CATEGORIES } from "../types";

const CATEGORY_IMAGES: Record<string, string> = {
  Adventure:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
  "Coffee Culture":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  "Digital Nomad":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  Food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  "Weekend Trips":
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
  Luxury:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "Budget Travel":
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
  Family:
    "https://images.unsplash.com/photo-1511895426328-dc871419130a?q=80&w=800&auto=format&fit=crop",
  Backpacking:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop",
  "Hidden Gems":
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop",
  Nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
  "Road Trips":
    "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=800&auto=format&fit=crop",
};

export default function Categories() {
  return (
    <section className="mt-16" aria-labelledby="guide-categories-heading">
      <SectionHeading
        id="guide-categories-heading"
        eyebrow="Browse"
        title="Guide categories for every kind of journey"
        description="Choose the pace, place, and coffee culture that fit your next trip."
        align="left"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GUIDE_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`${ROUTES.guides}?category=${encodeURIComponent(category)}#browse-guides`}
            className="card-hover group overflow-hidden rounded-3xl bg-white shadow-card transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <article>
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.Adventure}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 320px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-coffee-900">{category}</h3>
                <p className="text-sm leading-6 text-coffee-600">
                  Curated {category.toLowerCase()} guides for coffee-loving travelers.
                </p>
                <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Explore {category.toLowerCase()}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
