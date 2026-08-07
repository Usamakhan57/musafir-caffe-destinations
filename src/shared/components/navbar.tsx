"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { ROUTES } from "@/constants";
import { cn } from "@/shared/utils";

const navLinks = [
  { label: "Destinations", href: ROUTES.destinations },
  { label: "Cafés", href: ROUTES.cafes },
  { label: "Guides", href: ROUTES.guides },
  { label: "Community", href: ROUTES.community },
  { label: "Dashboard", href: ROUTES.dashboard },
] as const;

const joinFreeClassName =
  "btn-ripple inline-flex h-[46px] items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-4 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(92,64,51,0.65)] transition duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37] sm:px-5";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const isActive = (href: string) =>
    pathname === href || (href !== ROUTES.home && pathname.startsWith(`${href}/`));

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchQuery.trim();
    closeMenus();
    if (q) {
      router.push(`${ROUTES.destinations}?q=${encodeURIComponent(q)}`);
    } else {
      router.push(ROUTES.destinations);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#E5E7EB]/80 bg-white/80 shadow-[0_12px_40px_-28px_rgba(15,118,110,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#FAFAF9]/90 backdrop-blur-md",
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <nav
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[88px] sm:gap-4 sm:px-8 lg:h-[96px] lg:px-12"
        aria-label="Primary"
      >
        <Link
          href={ROUTES.home}
          className="flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
          aria-label="MusafirCaffe home"
        >
          <Image
            src="/musafircaffe-logo.png"
            alt="MusafirCaffe"
            width={1536}
            height={1024}
            priority={true}
            className="h-[54px] w-auto max-w-[min(52vw,220px)] object-contain object-left bg-transparent sm:h-[60px] sm:max-w-[260px] lg:h-[70px] lg:max-w-none"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 xl:gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={closeMenus}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-medium transition duration-300",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]",
                  active
                    ? "text-[#0F766E]"
                    : "text-[#374151] hover:bg-[#0F766E]/6 hover:text-[#0F766E]",
                )}
              >
                {link.label}
                {active ? (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#0F766E]"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative hidden md:block">
            <AnimatePresence initial={false}>
              {searchOpen ? (
                <motion.form
                  key="search"
                  initial={prefersReducedMotion ? false : { opacity: 0, width: 40 }}
                  animate={{ opacity: 1, width: 220 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, width: 40 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                  role="search"
                  aria-label="Site search"
                  onSubmit={handleSearch}
                >
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden
                  />
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations…"
                    className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-white py-2 pl-9 pr-3 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                    aria-label="Search"
                  />
                </motion.form>
              ) : (
                <button
                  key="search-btn"
                  type="button"
                  className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#374151] transition hover:border-[#0F766E]/35 hover:text-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                  aria-label="Open search"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-4 w-4" aria-hidden />
                </button>
              )}
            </AnimatePresence>
          </div>

          <Link
            href={ROUTES.login}
            className="hidden h-[46px] items-center rounded-xl px-3.5 text-sm font-medium text-[#374151] transition hover:bg-[#0F766E]/8 hover:text-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] sm:inline-flex"
          >
            Sign In
          </Link>
          <Link href={ROUTES.register} className={cn(joinFreeClassName, "shrink-0 px-3.5 sm:px-5")}>
            Join Free
          </Link>

          <button
            type="button"
            className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#374151] transition hover:bg-[#FAFAF9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] lg:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#E5E7EB] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 pb-6 sm:px-8">
              <form
                role="search"
                aria-label="Mobile site search"
                className="mb-2"
                onSubmit={handleSearch}
              >
                <label htmlFor="mobile-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden
                  />
                  <input
                    id="mobile-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, cafés…"
                    className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] py-2 pl-10 pr-3 text-sm outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/20"
                  />
                </div>
              </form>

              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "min-h-12 rounded-xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-[#0F766E]/10 text-[#0F766E]"
                        : "text-[#374151] hover:bg-[#FAFAF9]",
                    )}
                    onClick={closeMenus}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#E5E7EB] pt-4 sm:hidden">
                <Link
                  href={ROUTES.login}
                  className="inline-flex h-[46px] items-center justify-center rounded-[18px] border border-[#E5E7EB] px-4 text-sm font-medium text-[#111827]"
                  onClick={closeMenus}
                >
                  Sign In
                </Link>
                <Link
                  href={ROUTES.register}
                  className={cn(joinFreeClassName, "w-full")}
                  onClick={closeMenus}
                >
                  Join Free
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
