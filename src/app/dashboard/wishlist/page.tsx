import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { wishlistData } from "@/features/dashboard/data/dashboard-data";
import { getWishlistLabel } from "@/features/dashboard/lib/dashboard-utils";
import { ROUTES } from "@/constants/routes";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Wishlist" description="Save what you want to experience next, from cities to cafés and guides." activePath={ROUTES.dashboardWishlist}>
      <div className="space-y-5">
        <DashboardPage title="Saved places" description="Everything here is ready to become your next route.">
          <div className="grid gap-4 md:grid-cols-3">
            {wishlistData.map((item) => (
              <div key={item.id} className={`rounded-[24px] border border-slate-200 bg-gradient-to-br ${item.accent} p-5 text-white shadow-sm`}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">{getWishlistLabel(item.category)}</p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/85">{item.location}</p>
                <p className="mt-3 text-sm text-white/90">{item.notes}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/70">{item.savedAt}</p>
              </div>
            ))}
          </div>
        </DashboardPage>

        <DashboardPage title="Curated filters" description="Search and sort your saved places for the right next step.">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Search", "Find by city or title"],
              ["Filter", "By destination, café, or guide"],
              ["Sort", "Newest first or by category"],
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
