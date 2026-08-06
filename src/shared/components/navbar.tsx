"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { APP_NAME, ROUTES } from "@/constants";

const navLinks = [
  { label: "Destinations", href: ROUTES.destinations },
  { label: "Cafés", href: ROUTES.cafes },
  { label: "Guides", href: ROUTES.guides },
  { label: "Community", href: ROUTES.community },
  { label: "Dashboard", href: ROUTES.dashboard },
] as const;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href={ROUTES.home} className="flex items-center gap-3 text-[#111827]">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB] text-lg font-semibold text-white">
            M
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2563EB]">{APP_NAME}</p>
            <p className="text-xs font-medium text-slate-500">Travel · Coffee · Community</p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition duration-300 ${pathname === link.href ? "text-[#2563EB]" : "text-slate-700 hover:text-[#2563EB]"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:border-[#2563EB]/50 hover:text-[#2563EB] lg:inline-flex"
            aria-label="Search"
          >
            Search
          </button>
          <button
            type="button"
            className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:border-[#2563EB]/50 hover:text-[#2563EB] sm:inline-flex"
          >
            EN
          </button>
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-100 sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-22px_rgba(37,99,235,0.35)] transition duration-300 hover:bg-[#1D4ED8]"
          >
            Join free
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition duration-300 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">EN</button>
              <Link href="/login" className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Sign in</Link>
              <Link href="/register" className="rounded-2xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white">Join free</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
