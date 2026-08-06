export type DashboardRole = "traveler" | "cafe-owner" | "guide-creator" | "admin";

export type TripStatus = "upcoming" | "completed" | "cancelled" | "ai-generated";
export type WishlistCategory = "destination" | "cafe" | "guide";
export type NotificationCategory = "trip" | "community" | "billing" | "profile";

export interface DashboardMetric {
  label: string;
  value: string;
  hint: string;
}

export interface DashboardRecommendation {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}

export interface DashboardOverview {
  roleTitle: string;
  roleDescription: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  metrics: DashboardMetric[];
  recommendations: DashboardRecommendation[];
  recentActivity: Array<{ title: string; detail: string }>;
  savedPlaces: Array<{ name: string; location: string }>;
  aiSuggestions: Array<{ title: string; body: string }>;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  dates: string;
  status: TripStatus;
  description: string;
  progress: string;
  tags: string[];
}

export interface WishlistItem {
  id: string;
  title: string;
  category: WishlistCategory;
  location: string;
  notes: string;
  savedAt: string;
  accent: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  category: NotificationCategory;
}

export interface MessageThread {
  id: string;
  name: string;
  role: string;
  preview: string;
  unread: boolean;
  online: boolean;
  messages: Array<{ id: string; from: "me" | "them"; content: string; time: string }>;
}

export interface ProfileData {
  fullName: string;
  email: string;
  location: string;
  bio: string;
  languages: string[];
  travelStyle: string[];
  coffeePreference: string[];
  socialLinks: Array<{ label: string; value: string }>;
  profileCompletion: number;
  achievements: Array<{ title: string; detail: string }>;
}
