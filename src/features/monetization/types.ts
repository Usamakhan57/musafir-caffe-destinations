export type CommerceCategory = "hotel" | "flight" | "tour" | "gear";

export interface CommerceOffer {
  id: string;
  slug: string;
  category: CommerceCategory;
  title: string;
  summary: string;
  location: string;
  priceFrom: number;
  currency: string;
  rating: number;
  reviewCount: number;
  affiliatePartner: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface AffiliatePartner {
  id: string;
  name: string;
  network: string;
  category: CommerceCategory | "membership" | "general";
  commissionLabel: string;
  trackingParam: string;
}

export interface PaymentIntentDraft {
  id: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "processing" | "succeeded" | "canceled";
  description: string;
  clientSecret: string;
  createdAt: string;
}
