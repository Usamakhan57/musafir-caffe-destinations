"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ROUTES } from "@/constants/routes";

const modules = [
  { title: "Users", description: "Traveler, guide, and café owner management", status: "Operational" },
  { title: "Payments", description: "Stripe-ready ledger and invoice workflow", status: "Ready" },
  { title: "Destinations", description: "Editorial destination control and publishing", status: "Live" },
  { title: "Cafés", description: "Venue updates, hours, and amenities", status: "Live" },
  { title: "Guides", description: "Tour profiles, availability, and compliance", status: "Live" },
  { title: "Community", description: "Reviews, stories, and engagement", status: "Live" },
  { title: "Reviews", description: "Quality scoring and moderation", status: "Live" },
  { title: "Analytics", description: "Performance and community insights", status: "Live" },
  { title: "Media Library", description: "Images, galleries, and assets", status: "Live" },
  { title: "Newsletter", description: "Campaigns and audience lists", status: "Ready" },
  { title: "CMS Pages", description: "Landing pages and promotional content", status: "Live" },
  { title: "Settings", description: "Regional preferences and site defaults", status: "Live" },
  { title: "Role Management", description: "Permissions, governance, and ownership", status: "Ready" },
];

export function AdminDashboard() {
  const [activePanel, setActivePanel] = useState("Users");

  const metrics = useMemo(
    () => [
      { label: "Active users", value: "148", trend: "+12%" },
      { label: "Content", value: "24.8k", trend: "+8%" },
      { label: "Pending review", value: "19", trend: "-3" },
      { label: "Recovery rate", value: "91%", trend: "+5%" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#334155_100%)] p-6 text-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.65)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">Admin control center</p>
            <h2 className="mt-3 text-3xl font-semibold">Run content, community, and operational workflows from one premium console.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">The dashboard is structured for real-world business workflows with modular sections for users, content, analytics, and governance.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">
            <p className="font-semibold">Operational focus</p>
            <p className="mt-1 text-slate-300">Community and content operations are ready for live rollout.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-1 text-sm text-emerald-600">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Modules</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">Business operations</h3>
            </div>
            <Link href={ROUTES.dashboard} className="text-sm font-semibold text-slate-700">Return to dashboard</Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {modules.map((module) => (
              <button
                key={module.title}
                type="button"
                onClick={() => setActivePanel(module.title)}
                className={`rounded-[20px] border p-4 text-left transition ${activePanel === module.title ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
              >
                <p className="text-sm font-semibold">{module.title}</p>
                <p className={`mt-2 text-sm ${activePanel === module.title ? "text-slate-300" : "text-slate-500"}`}>{module.description}</p>
                <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.2em] ${activePanel === module.title ? "text-slate-400" : "text-slate-400"}`}>{module.status}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Selected module</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{activePanel}</h3>
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Operational readiness</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">This section is ready to support real admin workflows for users, content, analytics, and settings. The architecture is reusable, typed, and prepared for a future CMS or content pipeline integration.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">Users</p>
                <p className="mt-1 text-sm text-slate-600">Review traveler and creator accounts from a central admin view.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">Content</p>
                <p className="mt-1 text-sm text-slate-600">Manage destinations, cafés, guides, and community stories with a structured editorial workflow.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
