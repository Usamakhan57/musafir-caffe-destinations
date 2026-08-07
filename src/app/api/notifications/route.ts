import { z } from "zod";

import { auth } from "@/lib/auth";
import {
  listNotifications,
  markNotificationsRead,
} from "@/features/notifications";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = listNotifications(session.user.id ?? "demo").map((item) => ({
    ...item,
    time: formatRelative(item.createdAt),
  }));
  return Response.json({ items });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = z.object({ ids: z.array(z.string()).min(1) }).safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  markNotificationsRead(parsed.data.ids);
  return Response.json({ ok: true });
}

function formatRelative(iso: string) {
  const delta = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(delta / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}
