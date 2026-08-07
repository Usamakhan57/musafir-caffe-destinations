export type NotificationKind =
  | "system"
  | "community"
  | "trip"
  | "membership"
  | "review"
  | "affiliate";

export interface AppNotification {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  message: string;
  href?: string;
  unread: boolean;
  createdAt: string;
}

const notifications: AppNotification[] = [
  {
    id: "n1",
    userId: "demo",
    kind: "trip",
    title: "Planner reminder",
    message: "Your Lisbon café crawl draft is ready to refine.",
    href: "/planner",
    unread: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: "n2",
    userId: "demo",
    kind: "community",
    title: "New reply on your story",
    message: "Marco left a note on your Vienna weekend tips.",
    href: "/dashboard/community",
    unread: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "n3",
    userId: "demo",
    kind: "membership",
    title: "Nomad trial available",
    message: "Try offline packs and AI planner priority for 7 days.",
    href: "/membership",
    unread: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
];

export function listNotifications(userId = "demo") {
  return notifications
    .filter((n) => n.userId === userId || n.userId === "demo")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createNotification(
  input: Omit<AppNotification, "id" | "createdAt" | "unread"> & { unread?: boolean },
) {
  const record: AppNotification = {
    ...input,
    id: crypto.randomUUID(),
    unread: input.unread ?? true,
    createdAt: new Date().toISOString(),
  };
  notifications.unshift(record);
  return record;
}

export function markNotificationsRead(ids: string[]) {
  const set = new Set(ids);
  for (const item of notifications) {
    if (set.has(item.id)) item.unread = false;
  }
  return { ok: true };
}
