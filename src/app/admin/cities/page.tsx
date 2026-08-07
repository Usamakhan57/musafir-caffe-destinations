import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminCitiesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Cities"
      description="Manage cities linked to countries."
      activeHref={`${ROUTES.admin}/cities`}
    >
      <ResourceManager
        resource="cities"
        title="Cities"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "countryName", label: "Country" },
          { key: "slug", label: "Slug" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "countryId", label: "Country ID (UUID)", required: true },
          { key: "lat", label: "Latitude", type: "number" },
          { key: "lng", label: "Longitude", type: "number" },
        ]}
      />
    </AdminShell>
  );
}
