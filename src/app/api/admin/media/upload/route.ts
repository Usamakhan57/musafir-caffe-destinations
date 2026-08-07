import { dbCreateMedia } from "@/features/admin/data/cms-db";
import { jsonError, jsonOk, requireStaff } from "@/features/admin/lib/api";
import { canEditContent, canManageUsers, canModerate } from "@/features/admin/lib/validation";
import { uploadAdminMedia } from "@/features/admin/lib/storage";

export async function POST(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const role = session!.user.role;
  if (!canManageUsers(role) && !canEditContent(role) && !canModerate(role)) {
    return jsonError("Forbidden", 403);
  }

  const form = await request.formData().catch(() => null);
  if (!form) return jsonError("Expected multipart form data", 400);

  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("file is required", 400);

  const title = String(form.get("title") ?? file.name).slice(0, 120);
  const alt = String(form.get("alt") ?? "").slice(0, 200);
  const folder = String(form.get("folder") ?? "uploads").slice(0, 80);
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.byteLength === 0) return jsonError("Empty file", 400);
  if (bytes.byteLength > 8 * 1024 * 1024) return jsonError("File too large (max 8MB)", 400);

  try {
    const uploaded = await uploadAdminMedia({
      bytes,
      filename: file.name || "upload.bin",
      mimeType: file.type || "application/octet-stream",
      folder,
    });
    const record = await dbCreateMedia({
      title,
      url: uploaded.url,
      alt,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: bytes.byteLength,
      folder,
      provider: uploaded.provider,
      storagePath: uploaded.storagePath,
      uploadedById: session!.user.id,
    });
    return jsonOk(record, 201);
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Upload failed", 500);
  }
}
