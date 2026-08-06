import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Billing" description="Stay on top of your plan, invoices, and premium access." activePath={ROUTES.dashboardBilling}>
      <div className="space-y-5">
        <DashboardPage title="Subscription" description="Your current membership and benefits.">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-700">Explorer Plan</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">$12/month</p>
            <p className="mt-2 text-sm text-slate-600">Access premium recommendations, saved itineraries, and priority community features.</p>
          </div>
        </DashboardPage>

        <DashboardPage title="Payment history" description="A clean record of your recent transactions.">
          <div className="space-y-3">
            {[
              ["July invoice", "$12.00"],
              ["June invoice", "$12.00"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{label}</p>
                <p className="mt-2 text-sm text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
