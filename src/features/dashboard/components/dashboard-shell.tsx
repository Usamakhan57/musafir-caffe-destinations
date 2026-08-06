import Link from "next/link";
import type { Session } from "next-auth";

import { ROUTES } from "@/constants/routes";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { getRoleLabel } from "../lib/dashboard-utils";

interface DashboardShellProps {
  session: Session;
  title: string;
  description: string;
  activePath: string;
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: ROUTES.dashboard, description: "Overview" },
  { name: "My Trips", href: ROUTES.dashboardTrips, description: "Plan and track" },
  { name: "AI Planner", href: ROUTES.dashboardPlanner, description: "Create itineraries" },
  { name: "Saved Destinations", href: ROUTES.dashboardWishlist, description: "Places to revisit" },
  { name: "Saved Cafés", href: ROUTES.dashboardWishlist, description: "Coffee stops" },
  { name: "Saved Guides", href: ROUTES.dashboardWishlist, description: "Reference material" },
  { name: "Wishlist", href: ROUTES.dashboardWishlist, description: "Future plans" },
  { name: "Community", href: ROUTES.dashboardCommunity, description: "Connections" },
  { name: "Messages", href: ROUTES.dashboardMessages, description: "Inbox" },
  { name: "Notifications", href: ROUTES.dashboardNotifications, description: "Updates" },
  { name: "Achievements", href: ROUTES.dashboardAchievements, description: "Milestones" },
  { name: "Profile", href: ROUTES.dashboardProfile, description: "Your identity" },
  { name: "Account Settings", href: ROUTES.dashboardAccount, description: "Preferences" },
  { name: "Security", href: ROUTES.dashboardSecurity, description: "Access" },
  { name: "Billing", href: ROUTES.dashboardBilling, description: "Plans and invoices" },
];

export function DashboardShell({ session, title, description, activePath, children }: DashboardShellProps) {
  const role = getRoleLabel(session.user.role);
  const profileCompletion = session.user.isEmailVerified ? 92 : 76;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#eff6ff_45%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8 lg:py-8">
        <aside className="w-full shrink-0 rounded-[28px] border border-blue-100 bg-white/90 p-5 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur lg:w-80">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">Member lounge</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{session.user.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{role} · {session.user.email}</p>
            <div className="mt-4 h-2 rounded-full bg-blue-100">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${profileCompletion}%` }} />
            </div>
            <p className="mt-2 text-sm text-slate-600">Profile {profileCompletion}% complete</p>
          </div>

          <nav className="mt-6 space-y-1">
            {navigation.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`text-xs ${isActive ? "text-blue-100" : "text-slate-400"}`}>{item.description}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Need a fresh plan?</p>
            <p className="mt-1 text-sm text-slate-600">Your dashboard stays aligned with your next destination, your best cafés, and your community energy.</p>
            <Link href={ROUTES.dashboard} className="mt-4 inline-flex text-sm font-medium text-blue-700">
              Open overview →
            </Link>
          </div>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1 rounded-[32px] border border-blue-100 bg-white/80 p-5 shadow-[0_20px_70px_-38px_rgba(15,23,42,0.35)] backdrop-blur lg:p-8">
          <div className="mb-6 border-b border-slate-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Private dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{description}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

interface DashboardPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function DashboardPage({ title, description, children, action }: DashboardPageProps) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
