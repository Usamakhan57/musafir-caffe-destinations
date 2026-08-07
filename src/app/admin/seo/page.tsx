import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminSEOManagerPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="SEO Manager"
      description="Manage per-path SEO titles, descriptions, and indexing."
      activeHref={`${ROUTES.admin}/seo`}
    >
      <ResourceManager
        resource="seo"
        title="SEO Manager"
        supportsStatusBulk={false}
        columns={[
          { key: "path", label: "Path" },
          { key: "title", label: "Title" },
          { key: "noIndex", label: "No index" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "path", label: "Path", required: true },
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea", required: true },
          { key: "ogImage", label: "OG image URL", type: "url" },
          { key: "canonicalUrl", label: "Canonical URL", type: "url" },
          { key: "noIndex", label: "No index", type: "select", options: [{ label: "Index", value: "false" }, { label: "No index", value: "true" }] },
        ]}
      />
    </AdminShell>
  );
}
