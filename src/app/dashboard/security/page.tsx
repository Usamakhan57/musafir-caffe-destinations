import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function SecurityPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Security" description="Protect your account with clarity, control, and low-friction access." activePath={ROUTES.dashboardSecurity}>
      <div className="space-y-5">
        <DashboardPage title="Session safety" description="Protect your account while keeping your experience seamless.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Two-step verification is ready for your next layer of protection.</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Your password is managed through your secure account settings.</div>
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
