import "server-only";

import {
  createNotification as createNotificationDb,
  deleteNotifications as deleteNotificationsDb,
  listNotificationsForUser,
  markNotificationsRead as markNotificationsReadDb,
} from "@/server/db";

import type { AppNotification, NotificationKind } from "./types";

export type { AppNotification, NotificationKind } from "./types";

/** Memory fallback used only when Postgres is unreachable. */
const fallback: AppNotification[] = [];

export async function listNotifications(userId = "demo"): Promise<AppNotification[]> {
  const rows = await listNotificationsForUser(userId);
  if (rows) {
    return rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      kind: row.kind as NotificationKind,
      title: row.title,
      message: row.message,
      href: row.href ?? undefined,
      unread: row.unread,
      createdAt: row.createdAt.toISOString(),
    }));
  }
  return fallback
    .filter((n) => n.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createNotification(
  input: Omit<AppNotification, "id" | "createdAt" | "unread"> & { unread?: boolean },
): Promise<AppNotification> {
  const row = await createNotificationDb({
    userId: input.userId,
    kind: input.kind,
    title: input.title,
    message: input.message,
    href: input.href,
  });
  if (row) {
    return {
      id: row.id,
      userId: row.userId,
      kind: row.kind as NotificationKind,
      title: row.title,
      message: row.message,
      href: row.href ?? undefined,
      unread: row.unread,
      createdAt: row.createdAt.toISOString(),
    };
  }
  const record: AppNotification = {
    ...input,
    id: crypto.randomUUID(),
    unread: input.unread ?? true,
    createdAt: new Date().toISOString(),
  };
  fallback.unshift(record);
  return record;
}

export async function markNotificationsRead(userId: string, ids: string[]) {
  const result = await markNotificationsReadDb(userId, ids);
  if (result) return result;
  const set = new Set(ids);
  for (const item of fallback) {
    if (item.userId === userId && set.has(item.id)) item.unread = false;
  }
  return { ok: true };
}

export async function deleteNotifications(userId: string, ids: string[]) {
  const result = await deleteNotificationsDb(userId, ids);
  if (result) return result;
  const set = new Set(ids);
  for (let i = fallback.length - 1; i >= 0; i--) {
    if (fallback[i].userId === userId && set.has(fallback[i].id)) fallback.splice(i, 1);
  }
  return { ok: true };
}
