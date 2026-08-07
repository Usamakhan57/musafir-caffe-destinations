import { z } from "zod";

import { auth } from "@/lib/auth";
import { toggleBookmark, listBookmarks, toggleLike, toggleFollow } from "@/server/db";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await listBookmarks(session.user.id);
  return Response.json({ items: items ?? [] });
}

export async function POST(request: Request) {
  const limited = await checkRateLimit("social");
  if (!limited.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = z
    .object({
      action: z.enum(["bookmark", "like", "follow"]),
      targetType: z.enum(["destination", "cafe", "guide", "community", "comment"]).optional(),
      targetId: z.string().min(1),
      targetSlug: z.string().optional(),
      followingId: z.string().optional(),
    })
    .safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  if (parsed.data.action === "bookmark") {
    if (!parsed.data.targetType || parsed.data.targetType === "comment") {
      return Response.json({ error: "Invalid bookmark target" }, { status: 400 });
    }
    const result = await toggleBookmark({
      userId: session.user.id,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
      targetSlug: parsed.data.targetSlug,
    });
    return Response.json(result ?? { bookmarked: false, degraded: true });
  }

  if (parsed.data.action === "like") {
    if (!parsed.data.targetType) {
      return Response.json({ error: "targetType required" }, { status: 400 });
    }
    const result = await toggleLike({
      userId: session.user.id,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
    });
    return Response.json(result ?? { liked: false, degraded: true });
  }

  if (!parsed.data.followingId) {
    return Response.json({ error: "followingId required" }, { status: 400 });
  }
  const result = await toggleFollow(session.user.id, parsed.data.followingId);
  return Response.json(result ?? { following: false, degraded: true });
}
