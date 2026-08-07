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
