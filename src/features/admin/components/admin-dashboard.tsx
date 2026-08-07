"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ROUTES } from "@/constants";

import type { AnalyticsSnapshot } from "../types";

const modules = [
  { title: "Users", href: `${ROUTES.admin}/users`, description: "Traveler, editor, moderator, and admin accounts", status: "Operational" },
  { title: "Destinations", href: `${ROUTES.admin}/destinations`, description: "Editorial destination control and publishing", status: "Live" },
  { title: "Cafés", href: `${ROUTES.admin}/cafes`, description: "Venue updates, hours, and amenities", status: "Live" },
  { title: "Guides", href: `${ROUTES.admin}/guides`, description: "Guide profiles and publishing workflow", status: "Live" },
  { title: "Community", href: `${ROUTES.admin}/community`, description: "Stories and engagement posts", status: "Live" },
  { title: "Categories", href: `${ROUTES.admin}/categories`, description: "Taxonomy across content types", status: "Live" },
  { title: "Tags", href: `${ROUTES.admin}/tags`, description: "Shared tagging vocabulary", status: "Live" },
  { title: "Countries", href: `${ROUTES.admin}/countries`, description: "Country taxonomy for destinations and cafés", status: "Live" },
  { title: "Cities", href: `${ROUTES.admin}/cities`, description: "City records linked to countries", status: "Live" },
  { title: "Reviews", href: `${ROUTES.admin}/reviews`, description: "Quality scoring and moderation", status: "Live" },
  { title: "Media Library", href: `${ROUTES.admin}/media`, description: "Images, galleries, and assets", status: "Live" },
  { title: "Homepage", href: `${ROUTES.admin}/homepage`, description: "Homepage content documents", status: "Live" },
  { title: "SEO", href: `${ROUTES.admin}/seo`, description: "Page titles, descriptions, and indexing", status: "Live" },
  { title: "Settings", href: `${ROUTES.admin}/settings`, description: "Website configuration keys", status: "Live" },
  { title: "Contact", href: `${ROUTES.admin}/contact`, description: "Inbound contact messages", status: "Live" },
  { title: "Newsletter", href: `${ROUTES.admin}/newsletter`, description: "Subscriber list management", status: "Live" },
  { title: "Notifications", href: `${ROUTES.admin}/notifications`, description: "System and user notifications", status: "Live" },
  { title: "Payments", href: `${ROUTES.admin}/payments`, description: "Payment intents and revenue", status: "Live" },
  { title: "Affiliates", href: `${ROUTES.admin}/affiliates`, description: "Affiliate partners and tracking", status: "Live" },
];

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null);

  useEffect(() => {
    let active = true;
    void fetch("/api/admin/analytics")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && json) setAnalytics(json as AnalyticsSnapshot);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const metrics = [
    { label: "Users", value: analytics ? String(analytics.users) : "—", trend: "accounts" },
    { label: "Destinations", value: analytics ? String(analytics.destinations) : "—", trend: "catalog" },
    { label: "Cafés", value: analytics ? String(analytics.cafes) : "—", trend: "catalog" },
    { label: "Guides", value: analytics ? String(analytics.guides) : "—", trend: "catalog" },
    { label: "Community", value: analytics ? String(analytics.community) : "—", trend: "posts" },
    { label: "Reviews", value: analytics ? String(analytics.reviews) : "—", trend: "moderation" },
    {
      label: "Revenue",
      value: analytics ? `$${(analytics.revenueCents / 100).toFixed(2)}` : "—",
      trend: `${analytics?.paymentCount ?? 0} payments`,
    },
    {
      label: "Memberships",
      value: analytics ? String(analytics.memberships) : "—",
      trend: `traffic ${analytics?.traffic ?? "—"}`,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#334155_100%)] p-6 text-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.65)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">
              Admin control center
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Run content, community, and operational workflows from one premium console.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Production Prisma CRUD, JWT role protection, and Supabase media uploads for the full
              travel ecosystem.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">
            <p className="font-semibold">Operational focus</p>
            <p className="mt-1 text-slate-300">
              Draft {analytics?.draft ?? "—"} · Pending reviews {analytics?.pendingReviews ?? "—"} ·
              Affiliates {analytics?.affiliateClicks ?? "—"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-1 text-sm text-emerald-600">{metric.trend}</p>
          </div>
        ))}
      </div>

      <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
              Modules
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Business operations</h3>
          </div>
          <Link href={ROUTES.dashboard} className="text-sm font-semibold text-slate-700">
            Return to dashboard
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <p className="text-sm font-semibold">{module.title}</p>
              <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-300">
                {module.description}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {module.status}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
