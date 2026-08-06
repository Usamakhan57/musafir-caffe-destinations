"use client";

import { FadeIn } from "@/shared/ui";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-coffee-800 py-24 sm:py-32">
      <div className="texture-grain absolute inset-0" />

      {/* Decorative blurs */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-forest-400/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-forest-300">
            <span aria-hidden className="h-px w-8 bg-forest-400/60" />
            Stay Connected
            <span aria-hidden className="h-px w-8 bg-forest-400/60" />
          </span>

          <h2 className="mt-6 font-serif text-3xl leading-tight font-bold text-cream-50 sm:text-4xl lg:text-5xl">
            Get Travel Inspiration
            <br />
            <span className="text-gold-400">Delivered Weekly</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-cream-200/80">
            Join 86,000+ travelers receiving our weekly digest of hidden cafés,
            destination guides, and community stories. No spam — just wanderlust.
          </p>

          {/* Email form */}
          <form
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-1 items-center rounded-full bg-cream-50/10 px-6 py-1 ring-1 ring-cream-200/15 transition-all focus-within:bg-cream-50/15 focus-within:ring-cream-200/30 sm:rounded-r-none">
              <svg
                className="mr-3 h-5 w-5 shrink-0 text-cream-300/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent py-4 text-sm text-cream-50 placeholder:text-cream-300/50 focus:outline-none"
                aria-label="Email address for newsletter"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-coffee-950 shadow-lg transition-all hover:bg-gold-400 hover:shadow-xl active:scale-[0.98] sm:rounded-l-none"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-cream-300/50">
            Free forever. Unsubscribe anytime. We respect your inbox.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
