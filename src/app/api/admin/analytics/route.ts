import { dbAnalytics } from "@/features/admin/data/cms-db";
import { jsonError, jsonOk, requireStaff } from "@/features/admin/lib/api";

export async function GET() {
  const { error } = await requireStaff();
  if (error) return error;
  try {
    return jsonOk(await dbAnalytics());
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Database unavailable", 503);
  }
}
