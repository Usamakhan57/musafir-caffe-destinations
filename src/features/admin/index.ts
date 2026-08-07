export { AdminDashboard } from "./components/admin-dashboard";
export { AdminShell } from "./components/admin-shell";
export { ResourceManager } from "./components/resource-manager";
export { MediaLibrary } from "./components/media-library";
export {
  isStaffRole,
  canManageUsers,
  canEditContent,
  canModerate,
} from "./lib/validation";
export type {
  AdminResource,
  ContentStatus,
  PaginatedResponse,
  AnalyticsSnapshot,
} from "./types";
