"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { APP_NAME, ROUTES } from "@/constants";

const footerSections = [
  {
    title: "Destinations",
    links: [
      { label: "Featured cities", href: ROUTES.destinations },
      { label: "Cafés nearby", href: ROUTES.cafes },
      { label: "Travel guides", href: ROUTES.guides },
      { label: "Community trips", href: ROUTES.community },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Digital nomad tips", href: ROUTES.guides },
      { label: "AI trip planner", href: ROUTES.dashboardPlanner },
      { label: "Café owner hub", href: ROUTES.home },
      { label: "Help center", href: ROUTES.home },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MusafirCaffe", href: ROUTES.home },
      { label: "Careers", href: ROUTES.home },
      { label: "Press", href: ROUTES.home },
      { label: "Partners", href: ROUTES.home },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: ROUTES.home },
      { label: "Privacy policy", href: ROUTES.home },
      { label: "Terms of service", href: ROUTES.home },
      { label: "Accessibility", href: ROUTES.home },
    ],
  },
] as const;

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.833L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S.02 4.88.02 3.5 1.14 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V23H.24V8.25zM8.34 8.25h4.33v2.01h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V23h-4.52v-6.74c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V23H8.34V8.25z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Link href={ROUTES.home} className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F766E] text-lg font-semibold text-white">
                M
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#14B8A6]">
                  {APP_NAME}
                </p>
                <p className="text-xs text-white/60">Travel · Coffee · Community</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Discover destinations, cafés, and travel stories from a global
              community of curious wanderers.
            </p>

            <form
              className="mt-2 flex max-w-sm flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Footer newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <div className="relative flex-1">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  aria-hidden
                />
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="h-11 w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0F766E] px-4 text-sm font-semibold text-white transition hover:bg-[#0d5f59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
              >
                Join
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#14B8A6]/40 hover:bg-[#0F766E]/30 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#14B8A6]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p>Crafted for travelers, café lovers, and digital nomads.</p>
        </div>
      </div>
    </footer>
  );
}
