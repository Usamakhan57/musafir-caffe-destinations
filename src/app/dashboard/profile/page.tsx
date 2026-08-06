import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { profileData } from "@/features/dashboard/data/dashboard-data";
import { ROUTES } from "@/constants/routes";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Profile" description="Curate your identity, your interests, and your travel voice." activePath={ROUTES.dashboardProfile}>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardPage title="Professional profile" description="Shape how your profile appears to the community.">
          <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-900 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Travel identity</p>
                <h3 className="mt-2 text-2xl font-semibold">{profileData.fullName}</h3>
                <p className="mt-2 text-sm text-blue-50/90">{profileData.location}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl font-semibold">{profileData.fullName.charAt(0)}</div>
            </div>
            <p className="mt-5 text-sm text-blue-50/90">{profileData.bio}</p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Avatar upload</p>
              <p className="mt-2 text-sm text-slate-600">A polished profile photo helps your future hosts and fellow travelers recognize you.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Cover photo</p>
              <p className="mt-2 text-sm text-slate-600">Use a memorable image that reflects your style, route, and favorite coffee regions.</p>
            </div>
          </div>
        </DashboardPage>

        <DashboardPage title="Travel identity" description="Signal your preferences and personal style.">
          <div className="space-y-3">
            {[
              ["Languages", profileData.languages.join(", ")],
              ["Travel style", profileData.travelStyle.join(", ")],
              ["Coffee preference", profileData.coffeePreference.join(", ")],
              ["Social links", profileData.socialLinks.map((item) => `${item.label}: ${item.value}`).join(" · ")],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="mt-2 text-sm text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
