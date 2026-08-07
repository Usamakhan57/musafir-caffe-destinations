import { z } from "zod";

import { auth } from "@/lib/auth";
import {
  createTrip,
  deleteTrip,
  getTripByShareSlug,
  listTrips,
  updateTrip,
} from "@/server/db";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shareSlug = searchParams.get("share");
  if (shareSlug) {
    const trip = await getTripByShareSlug(shareSlug);
    if (!trip) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ trip });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const trips = await listTrips(session.user.id);
  return Response.json({ items: trips ?? [] });
}

export async function POST(request: Request) {
  const limited = await checkRateLimit("trips");
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
      title: z.string().min(2).max(160),
      destination: z.string().optional(),
      payload: z.record(z.string(), z.unknown()),
      isPublic: z.boolean().optional(),
    })
    .safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  const trip = await createTrip({
    userId: session.user.id,
    title: parsed.data.title,
    destination: parsed.data.destination,
    payload: parsed.data.payload,
    isPublic: parsed.data.isPublic,
  });

  if (!trip) {
    return Response.json(
      { error: "Database unavailable", degraded: true },
      { status: 503 },
    );
  }
  return Response.json({ trip }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = z
    .object({
      id: z.string().min(1),
      title: z.string().min(2).max(160).optional(),
      destination: z.string().optional(),
      payload: z.record(z.string(), z.unknown()).optional(),
      isPublic: z.boolean().optional(),
    })
    .safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  const trip = await updateTrip(session.user.id, parsed.data.id, parsed.data);
  if (!trip) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ trip });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const parsed = z.object({ id: z.string().min(1) }).safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }
  await deleteTrip(session.user.id, parsed.data.id);
  return Response.json({ ok: true });
}
