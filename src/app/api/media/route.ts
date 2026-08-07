import { z } from "zod";

import { auth } from "@/lib/auth";
import { createMediaAsset, listMediaAssets } from "@/server/db";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";
import { isStaffRole } from "@/features/admin";

/**
 * Supabase-storage ready media API.
 * Accepts registered URLs now; when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 * are set, clients can upload then register the returned public URL here.
 */
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user || !isStaffRole(session.user.role)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 24);
  const result = await listMediaAssets(q, page, pageSize);
  if (!result) {
    return Response.json({ items: [], page, pageSize, total: 0, totalPages: 1, degraded: true });
  }
  return Response.json(result);
}

export async function POST(request: Request) {
  const limited = await checkRateLimit("media");
  if (!limited.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user || !isStaffRole(session.user.role)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = z
    .object({
      title: z.string().min(2).max(120),
      url: z.string().url(),
      alt: z.string().max(200).optional(),
      mimeType: z.string().optional(),
      sizeBytes: z.number().int().min(0).optional(),
      folder: z.string().optional(),
      provider: z.enum(["url", "supabase", "local"]).optional(),
      storagePath: z.string().optional(),
    })
    .safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  const asset = await createMediaAsset({
    ...parsed.data,
    uploadedById: session.user.id,
  });

  if (!asset) {
    return Response.json({ error: "Database unavailable" }, { status: 503 });
  }

  return Response.json({
    asset,
    storage: {
      provider: process.env.SUPABASE_URL ? "supabase" : "url",
      bucket: process.env.SUPABASE_STORAGE_BUCKET ?? "media",
      ready: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
  }, { status: 201 });
}
