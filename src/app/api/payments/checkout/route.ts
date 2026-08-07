import { z } from "zod";

import { membershipWelcomeEmail, sendEmail } from "@/features/email";
import {
  createPaymentIntentDraft,
  membershipPlans,
} from "@/features/monetization";
import { createNotification } from "@/features/notifications";
import { auth } from "@/lib/auth";

const checkoutSchema = z.object({
  planId: z.string().min(1),
  interval: z.enum(["month", "year"]).default("month"),
});

/**
 * Payment-ready checkout endpoint.
 * Creates a Stripe-shaped PaymentIntent draft without charging.
 * Set STRIPE_SECRET_KEY (or similar) to swap in a live provider adapter.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const plan = membershipPlans.find((p) => p.id === parsed.data.planId);
  if (!plan) {
    return Response.json({ error: "Unknown plan" }, { status: 404 });
  }

  const amount =
    parsed.data.interval === "year" ? plan.priceYearly * 100 : plan.priceMonthly * 100;

  if (amount === 0) {
    return Response.json({
      ok: true,
      provider: process.env.STRIPE_SECRET_KEY ? "stripe" : "mock",
      plan,
      paymentIntent: null,
      message: "Free plan activated",
    });
  }

  const paymentIntent = createPaymentIntentDraft({
    amount,
    currency: "usd",
    description: `${plan.name} membership (${parsed.data.interval})`,
  });

  createNotification({
    userId: session.user.id ?? "demo",
    kind: "membership",
    title: "Checkout started",
    message: `Complete payment for ${plan.name} to unlock premium benefits.`,
    href: "/dashboard/billing",
  });

  if (session.user.email) {
    const mail = membershipWelcomeEmail(plan.name);
    mail.to = session.user.email;
    // Welcome email is sent after webhook confirmation in production.
    await sendEmail({
      ...mail,
      subject: `Checkout ready: ${plan.name}`,
      text: `Complete checkout for ${plan.name}. Client secret issued.`,
    });
  }

  return Response.json({
    ok: true,
    provider: process.env.STRIPE_SECRET_KEY ? "stripe" : "mock",
    plan,
    paymentIntent,
  });
}

export async function GET() {
  return Response.json({
    plans: membershipPlans,
    providerReady: Boolean(process.env.STRIPE_SECRET_KEY),
  });
}
