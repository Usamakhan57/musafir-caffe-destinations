import Link from "next/link";
import type { Session } from "next-auth";

import { ROUTES } from "@/constants/routes";
import { dashboardOverviewData } from "../data/dashboard-data";
import { DashboardCard } from "./dashboard-card";
import { DashboardPage, DashboardShell } from "./dashboard-shell";

interface DashboardHomeProps {
  session: Session;
}

export function DashboardHome({ session }: DashboardHomeProps) {
  const role = session.user.role;
  const overview = dashboardOverviewData[role] ?? dashboardOverviewData.traveler;

  return (
    <DashboardShell
      session={session}
      title={overview.roleTitle}
      description={overview.roleDescription}
      activePath={ROUTES.dashboard}
    >
      <div className="space-y-5">
        <DashboardPage title="Welcome back" description="A clear view of your next move.">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Travel intelligence</p>
              <h3 className="mt-3 text-2xl font-semibold">{overview.welcomeTitle}</h3>
              <p className="mt-3 max-w-xl text-sm text-blue-50/90">{overview.welcomeSubtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={ROUTES.dashboardTrips} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5">View trips</Link>
                <Link href={ROUTES.dashboardPlanner} className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Open planner</Link>
              </div>
            </div>
            <DashboardCard title="Profile completion" description="Your profile is shaping your recommendations.">
              <div className="mt-2 h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${session.user.isEmailVerified ? 86 : 74}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{session.user.isEmailVerified ? "86% complete · Add your travel style and socials to sharpen recommendations." : "74% complete · A few details will make your recommendations more precise."}</p>
            </DashboardCard>
          </div>
        </DashboardPage>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <DashboardPage title="Travel statistics" description="A living view of your journey rhythm.">
            <div className="grid gap-3 sm:grid-cols-3">
              {overview.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{metric.hint}</p>
                </div>
              ))}
            </div>
          </DashboardPage>

          <DashboardPage title="Recent activity" description="What you’ve been chasing lately.">
            <div className="space-y-3">
              {overview.recentActivity.map((activity) => (
                <div key={activity.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{activity.detail}</p>
                </div>
              ))}
            </div>
          </DashboardPage>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <DashboardPage title="Recommended next steps" description="Handpicked for your taste and pace.">
            <div className="grid gap-3">
              {overview.recommendations.map((item) => (
                <div key={item.title} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
                    </div>
                    <Link href={item.href} className="text-sm font-semibold text-blue-700">{item.cta}</Link>
                  </div>
                </div>
              ))}
            </div>
          </DashboardPage>

          <DashboardPage title="Saved places" description="Places you’ve already chosen to revisit.">
            <div className="grid gap-3">
              {overview.savedPlaces.map((place) => (
                <div key={place.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{place.location}</p>
                </div>
              ))}
            </div>
          </DashboardPage>
        </div>

        <DashboardPage title="AI suggestions" description="Thoughtful ideas tailored to your recent behavior.">
          <div className="grid gap-3 md:grid-cols-2">
            {overview.aiSuggestions.map((suggestion) => (
              <div key={suggestion.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{suggestion.title}</p>
                <p className="mt-2 text-sm text-slate-600">{suggestion.body}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
