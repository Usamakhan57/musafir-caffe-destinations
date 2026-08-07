import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminTagsPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Tags"
      description="Maintain freeform tags used across CMS content."
      activeHref={`${ROUTES.admin}/tags`}
    >
      <ResourceManager
        resource="tags"
        title="Tags"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "slug", label: "Slug", required: true },
        ]}
      />
    </AdminShell>
  );
}
