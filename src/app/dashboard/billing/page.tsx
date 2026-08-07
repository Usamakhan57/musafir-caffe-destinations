import Link from "next/link";

import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { membershipPlans } from "@/features/monetization";
import { ROUTES } from "@/constants/routes";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const current = membershipPlans[0];
  const upgrade = membershipPlans.find((plan) => plan.highlighted) ?? membershipPlans[1];

  return (
    <DashboardShell
      session={session}
      title="Billing"
      description="Stay on top of your plan, invoices, and premium access."
      activePath={ROUTES.dashboardBilling}
    >
      <div className="space-y-5">
        <DashboardPage title="Subscription" description="Your current membership and benefits.">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-700">{current.name} Plan</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {current.priceMonthly === 0 ? "Free" : `$${current.priceMonthly}/month`}
            </p>
            <p className="mt-2 text-sm text-slate-600">{current.description}</p>
            <Link
              href={ROUTES.membership}
              className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
            >
              Compare plans & checkout
            </Link>
          </div>
        </DashboardPage>

        <DashboardPage title="Recommended upgrade" description="Payment-ready checkout for premium tools.">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">{upgrade.name}</p>
            <p className="mt-2 text-sm text-slate-600">
              ${upgrade.priceMonthly}/month — {upgrade.features.slice(0, 2).join(" · ")}
            </p>
          </div>
        </DashboardPage>

        <DashboardPage title="Payment history" description="A clean record of your recent transactions.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
              No paid invoices yet. Checkout intents appear here after a provider webhook confirms payment.
            </div>
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
