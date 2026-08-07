import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminCafesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Cafés"
      description="Curate café listings, specialty notes, and publication status."
      activeHref={`${ROUTES.admin}/cafes`}
    >
      <ResourceManager
        resource="cafes"
        title="Cafés"
        columns={[
          { key: "name", label: "Name" },
          { key: "city", label: "City" },
          { key: "country", label: "Country" },
          { key: "status", label: "Status" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "city", label: "City", required: true },
          { key: "country", label: "Country", required: true },
          { key: "summary", label: "Summary", type: "textarea", required: true },
          { key: "coverImage", label: "Cover image URL", type: "url" },
          { key: "tags", label: "Tags (comma-separated)" },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
              { label: "Archived", value: "archived" },
            ],
          },
        ]}
      />
    </AdminShell>
  );
}
