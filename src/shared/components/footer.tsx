"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { APP_NAME, ROUTES } from "@/constants";

const socialUrls = {
  facebook: "https://facebook.com/musafircaffe",
  instagram: "https://instagram.com/musafircaffe",
  x: "https://x.com/musafircaffe",
  youtube: "https://youtube.com/@musafircaffe",
} as const;

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: ROUTES.destinations },
      { label: "Cafés", href: ROUTES.cafes },
      { label: "Guides", href: ROUTES.guides },
      { label: "Community", href: ROUTES.community },
    ],
  },
  {
    title: "Travel & shop",
    links: [
      { label: "Hotels", href: ROUTES.hotels },
      { label: "Flights", href: ROUTES.flights },
      { label: "Tours", href: ROUTES.tours },
      { label: "Coffee Gear", href: ROUTES.gear },
      { label: "Membership", href: ROUTES.membership },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Contact", href: ROUTES.contact },
      { label: "Affiliate", href: ROUTES.affiliate },
      { label: "Careers", href: ROUTES.careers },
      { label: "Press", href: ROUTES.press },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Travel Tips", href: ROUTES.travelTips },
      { label: "FAQ", href: ROUTES.faq },
      { label: "Help Center", href: ROUTES.help },
      { label: "Offline", href: ROUTES.offline },
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

function YouTubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3.05 3.05 0 0 0-2.15-2.16C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.35.54A3.05 3.05 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3.05 3.05 0 0 0 2.15 2.16C4.5 20.5 12 20.5 12 20.5s7.5 0 9.35-.54a3.05 3.05 0 0 0 2.15-2.16A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: socialUrls.facebook, icon: FacebookIcon },
  { label: "Instagram", href: socialUrls.instagram, icon: InstagramIcon },
  { label: "X", href: socialUrls.x, icon: XIcon },
  { label: "YouTube", href: socialUrls.youtube, icon: YouTubeIcon },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Link
              href={ROUTES.home}
              className="inline-flex w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
              aria-label="MusafirCaffe home"
            >
              <Image
                src="/musafircaffe-logo.png"
                alt="MusafirCaffe"
                width={1536}
                height={1024}
                className="h-12 w-auto bg-transparent object-contain sm:h-14"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Discover destinations, cafés, and travel stories from a global
              community of curious wanderers — where every journey starts with a cup.
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
              <p className="mr-1 w-full text-xs font-semibold uppercase tracking-[0.2em] text-[#14B8A6] sm:w-auto">
                Social
              </p>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-[#14B8A6]/40 hover:bg-[#0F766E]/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
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
                      className="group inline-flex text-sm text-white/65 transition hover:text-white"
                    >
                      <span className="border-b border-transparent transition group-hover:border-white/40">
                        {link.label}
                      </span>
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
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <Link href={ROUTES.privacy} className="hover:text-white">
              Privacy
            </Link>
            <Link href={ROUTES.terms} className="hover:text-white">
              Terms
            </Link>
            <Link href={ROUTES.cookies} className="hover:text-white">
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
