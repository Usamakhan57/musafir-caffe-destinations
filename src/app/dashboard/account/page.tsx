import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Account Settings" description="Keep your account details, privacy, and preferences aligned with your travel habits." activePath={ROUTES.dashboardAccount}>
      <div className="space-y-5">
        <DashboardPage title="Email and password" description="Control the essentials of your account access.">
          <div className="space-y-3">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">Email: {session.user.email}</div>
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">Password: managed securely through your account control center.</div>
          </div>
        </DashboardPage>

        <DashboardPage title="Notification preferences" description="Tune the rhythm of updates without sacrificing relevance.">
          <div className="space-y-3">
            {[
              ["Email notifications", "Enabled"],
              ["Push notifications", "Enabled"],
              ["Privacy", "Private"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
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
