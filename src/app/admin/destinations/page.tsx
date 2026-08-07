import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminDestinationsPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Destinations"
      description="Create, edit, and publish destination records for the CMS."
      activeHref={`${ROUTES.admin}/destinations`}
    >
      <ResourceManager
        resource="destinations"
        title="Destinations"
        columns={[
          { key: "title", label: "Title" },
          { key: "city", label: "City" },
          { key: "country", label: "Country" },
          { key: "status", label: "Status" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "title", label: "Title", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "country", label: "Country", required: true },
          { key: "city", label: "City", required: true },
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
