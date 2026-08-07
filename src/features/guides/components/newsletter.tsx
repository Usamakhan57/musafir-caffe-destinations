"use client";

import type { FormEvent } from "react";

export default function NewsletterCTA() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="mt-16 mb-24">
      <div className="overflow-hidden rounded-[32px] bg-[#2563EB] shadow-elevated">
        <div className="grid gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.75fr_1fr] md:px-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Newsletter</p>
            <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Receive premium guides and coffee travel stories.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200/90">
              Weekly inspiration, curated cafés, and destination guides delivered straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] bg-white/10 p-6 backdrop-blur-sm sm:p-8"
            aria-label="Guides newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-white outline-none placeholder:text-slate-200 focus:border-white/50 focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="mt-5 w-full rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#2563EB] transition hover:bg-slate-100"
            >
              Subscribe now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
