import Link from "next/link";

import { ROUTES } from "@/constants";

interface DetailCtaProps {
  destinationName: string;
}

export function DetailCta({ destinationName }: DetailCtaProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-coffee-950 px-6 py-16 text-center sm:px-12">
      <div className="texture-grain absolute inset-0" />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
        <h2 className="font-serif text-3xl font-semibold text-cream-50 sm:text-4xl">
          Ready to plan your trip to {destinationName}?
        </h2>
        <p className="text-cream-200/80">
          Save your favorite cafés, get an AI-crafted itinerary, and connect with travelers who
          have already been.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ROUTES.register}
            className="rounded-full bg-forest-600 px-7 py-3 text-sm font-semibold text-cream-50 shadow-lg transition-all hover:bg-forest-500 hover:shadow-xl active:scale-[0.98]"
          >
            Plan this trip
          </Link>
          <Link
            href={ROUTES.destinations}
            className="rounded-full border border-cream-200/25 px-7 py-3 text-sm font-medium text-cream-100 transition-all hover:border-cream-200/50 hover:bg-cream-50/10"
          >
            Browse more destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
