import type { DashboardRole, WishlistCategory } from "../types";

export function getRoleLabel(role: DashboardRole | string): string {
  switch (role) {
    case "admin":
      return "Admin";
    case "cafe-owner":
      return "Cafe owner";
    case "guide-creator":
      return "Guide creator";
    default:
      return "Traveler";
  }
}

export function getWishlistLabel(category: WishlistCategory): string {
  switch (category) {
    case "cafe":
      return "Café";
    case "guide":
      return "Guide";
    default:
      return "Destination";
  }
}

export function getStatusClasses(status: string): string {
  switch (status) {
    case "upcoming":
      return "bg-blue-50 text-blue-700";
    case "completed":
      return "bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
