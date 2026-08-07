import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminAffiliatesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Affiliates"
      description="Manage affiliate partners and tracking parameters."
      activeHref={`${ROUTES.admin}/affiliates`}
    >
      <ResourceManager
        resource="affiliates"
        title="Affiliates"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "network", label: "Network" },
          { key: "category", label: "Category" },
          { key: "commissionLabel", label: "Commission" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "network", label: "Network", required: true },
          { key: "category", label: "Category", required: true },
          { key: "commissionLabel", label: "Commission label", required: true },
          { key: "trackingParam", label: "Tracking param", required: true },
        ]}
      />
    </AdminShell>
  );
}
