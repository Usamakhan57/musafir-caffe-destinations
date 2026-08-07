import type { ReactNode } from "react";
import Link from "next/link";

import { ROUTES } from "@/constants";

const NAV = [
  { href: ROUTES.admin, label: "Dashboard" },
  { href: `${ROUTES.admin}/users`, label: "Users" },
  { href: `${ROUTES.admin}/destinations`, label: "Destinations" },
  { href: `${ROUTES.admin}/cafes`, label: "Cafés" },
  { href: `${ROUTES.admin}/guides`, label: "Guides" },
  { href: `${ROUTES.admin}/community`, label: "Community" },
  { href: `${ROUTES.admin}/categories`, label: "Categories" },
  { href: `${ROUTES.admin}/tags`, label: "Tags" },
  { href: `${ROUTES.admin}/reviews`, label: "Reviews" },
  { href: `${ROUTES.admin}/media`, label: "Media" },
] as const;

interface AdminShellProps {
  title: string;
  description: string;
  activeHref: string;
  children: ReactNode;
}

export function AdminShell({ title, description, activeHref, children }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#eff6ff_45%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_70px_-38px_rgba(15,23,42,0.35)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
            Admin console
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <nav
          aria-label="Admin modules"
          className="flex flex-wrap gap-2 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm"
        >
          {NAV.map((item) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </div>
    </main>
  );
}
