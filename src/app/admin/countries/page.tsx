import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminCountriesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Countries"
      description="Manage country records used across destinations and cafés."
      activeHref={`${ROUTES.admin}/countries`}
    >
      <ResourceManager
        resource="countries"
        title="Countries"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "code", label: "Code" },
          { key: "region", label: "Region" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "code", label: "ISO code" },
          { key: "flag", label: "Flag emoji / URL" },
          { key: "region", label: "Region" },
        ]}
      />
    </AdminShell>
  );
}
