import Link from "next/link";
import type { Session } from "next-auth";

import { ROUTES } from "@/constants/routes";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { cn } from "@/shared/utils";
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

export function DashboardShell({
  session,
  title,
  description,
  activePath,
  children,
}: DashboardShellProps) {
  const role = getRoleLabel(session.user.role);
  const profileCompletion = session.user.isEmailVerified ? 92 : 76;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:flex-row lg:gap-6 lg:px-8 lg:py-8">
        <aside className="w-full shrink-0 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_18px_50px_-34px_rgba(15,118,110,0.3)] sm:p-5 lg:w-80">
          <div className="rounded-2xl border border-[#0F766E]/15 bg-[#0F766E]/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              Member lounge
            </p>
            <h2 className="mt-2 font-serif text-xl font-semibold text-[#111827]">
              {session.user.name}
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              {role} · {session.user.email}
            </p>
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-[#0F766E]/15"
              role="progressbar"
              aria-valuenow={profileCompletion}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Profile completion"
            >
              <div
                className="h-2 rounded-full bg-[#0F766E] transition-all"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-[#6B7280]">
              Profile {profileCompletion}% complete
            </p>
          </div>

          <nav className="mt-5 max-h-[50vh] space-y-1 overflow-y-auto pr-1 lg:max-h-none" aria-label="Dashboard">
            {navigation.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]",
                    isActive
                      ? "bg-[#0F766E] text-white shadow-sm"
                      : "text-[#4B5563] hover:bg-[#0F766E]/8 hover:text-[#0F766E]",
                  )}
                >
                  <span className="font-medium">{item.name}</span>
                  <span
                    className={cn(
                      "hidden text-[11px] sm:inline",
                      isActive ? "text-teal-100" : "text-[#9CA3AF]",
                    )}
                  >
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] p-4">
            <p className="text-sm font-semibold text-[#111827]">Need a fresh plan?</p>
            <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
              Keep your next destination, cafés, and community energy aligned in one place.
            </p>
            <Link
              href={ROUTES.dashboard}
              className="mt-4 inline-flex text-sm font-semibold text-[#0F766E] transition hover:underline"
            >
              Open overview →
            </Link>
          </div>

          <div className="mt-5">
            <LogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_20px_60px_-38px_rgba(15,118,110,0.3)] sm:p-6 lg:p-8">
          <div className="mb-6 border-b border-[#E5E7EB] pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              Private dashboard
            </p>
            <h1 className="mt-2 font-serif text-2xl font-semibold text-[#111827] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:text-base">
              {description}
            </p>
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

export function DashboardPage({
  title,
  description,
  children,
  action,
}: DashboardPageProps) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[#111827]">{title}</h2>
          <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
