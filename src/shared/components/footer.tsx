import Link from "next/link";

import { APP_NAME, ROUTES } from "@/constants";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: ROUTES.destinations },
      { label: "Cafés", href: ROUTES.cafes },
      { label: "Travel Guides", href: ROUTES.guides },
      { label: "Community", href: ROUTES.community },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: ROUTES.home },
      { label: "Blog", href: ROUTES.home },
      { label: "Careers", href: ROUTES.home },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: ROUTES.home },
      { label: "Contact", href: ROUTES.home },
      { label: "Privacy Policy", href: ROUTES.home },
    ],
  },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr,1fr,1fr]">
          <div className="flex flex-col gap-5">
            <Link href={ROUTES.home} className="flex items-center gap-3 text-[#111827]">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2563EB] text-lg font-semibold text-white">
                M
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2563EB]">{APP_NAME}</p>
                <p className="text-xs text-slate-500">Travel · Coffee · Community</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              MusafirCaffe brings together travel stories, coffee culture, and community discovery in one modern space.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-500 transition hover:text-[#2563EB]"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-[#2563EB]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p>Designed for travel, coffee, and community discovery.</p>
        </div>
      </div>
    </footer>
  );
}
