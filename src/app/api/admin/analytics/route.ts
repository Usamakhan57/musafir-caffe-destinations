import { cmsStore } from "@/features/admin/data/cms-store";
import { jsonOk, requireStaff } from "@/features/admin/lib/api";

export async function GET() {
  const { error } = await requireStaff();
  if (error) return error;
  return jsonOk(cmsStore.analytics());
}
