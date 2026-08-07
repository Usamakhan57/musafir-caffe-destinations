import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminGuidesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Guides"
      description="Edit long-form travel guides and editorial drafts."
      activeHref={`${ROUTES.admin}/guides`}
    >
      <ResourceManager
        resource="guides"
        title="Guides"
        columns={[
          { key: "title", label: "Title" },
          { key: "authorName", label: "Author" },
          { key: "status", label: "Status" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "title", label: "Title", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "authorName", label: "Author", required: true },
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
