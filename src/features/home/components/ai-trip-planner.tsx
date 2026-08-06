import Link from "next/link";

import { ROUTES } from "@/constants";
import { FadeIn } from "@/shared/ui";

export function AiTripPlanner() {
  return (
    <section className="relative overflow-hidden border-t border-cream-200 bg-gradient-to-br from-coffee-900 via-coffee-800 to-forest-900 py-24 sm:py-32">
      <div className="texture-grain absolute inset-0" />

      {/* Decorative elements */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-forest-600/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <FadeIn direction="left">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                AI-Powered
              </span>

              <h2 className="mt-6 font-serif text-4xl leading-tight font-bold text-cream-50 sm:text-5xl">
                Plan Your Perfect
                <br />
                <span className="gold-shimmer">Coffee Journey</span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-200/80">
                Tell our AI your travel style, coffee preferences, and budget. Get a personalized
                itinerary with the best cafés, local experiences, and hidden gems — in seconds.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Personalized café recommendations based on your taste",
                  "Day-by-day itineraries with walking routes",
                  "Local coffee culture insights and etiquette tips",
                  "Budget optimization across destinations",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-cream-200/80">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-forest-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href={ROUTES.guides}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-coffee-950 shadow-lg transition-all hover:bg-gold-400 hover:shadow-xl active:scale-[0.98]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  Start planning with AI
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — demo card */}
          <FadeIn direction="right" delay={0.2}>
            <div className="rounded-3xl border border-cream-200/10 bg-coffee-950/60 p-8 shadow-elevated backdrop-blur-sm">
              <div className="space-y-6">
                {/* Demo prompt */}
                <div className="rounded-2xl bg-cream-50/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-cream-400/60">
                    Your prompt
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream-200/90">
                    &ldquo;I want a 5-day coffee trip in Japan, focusing on traditional kissaten in
                    Kyoto and specialty roasters in Tokyo. Budget: moderate. I love pour-overs and
                    minimalist spaces.&rdquo;
                  </p>
                </div>

                {/* Demo response preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-forest-400" />
                    <span className="text-xs font-medium text-forest-400">AI crafting your itinerary...</span>
                  </div>

                  {[
                    { day: "Day 1", title: "Arrive Kyoto — Kissaten Discovery", spots: "3 cafés" },
                    { day: "Day 2", title: "Arashiyama & Matcha Trail", spots: "4 cafés" },
                    { day: "Day 3", title: "Kyoto → Tokyo via Shinkansen", spots: "2 cafés" },
                  ].map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center gap-4 rounded-xl bg-cream-50/5 p-4"
                    >
                      <span className="shrink-0 rounded-lg bg-forest-600/20 px-2.5 py-1 text-xs font-bold text-forest-300">
                        {item.day}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-cream-100">{item.title}</p>
                        <p className="text-xs text-cream-400/60">{item.spots} recommended</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 border-t border-cream-200/10 pt-4 text-xs text-cream-400/50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Full itinerary generated in ~12 seconds
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
