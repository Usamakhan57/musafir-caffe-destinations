"use client";

import { useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { membershipPlans } from "@/features/monetization";

export function MembershipCheckout() {
  const [message, setMessage] = useState<string | null>(null);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  async function checkout(planId: string) {
    setPendingPlan(planId);
    setMessage(null);
    const res = await fetch("/api/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, interval: "month" }),
    });
    const body = await res.json().catch(() => ({}));
    setPendingPlan(null);

    if (res.status === 401) {
      setMessage("Sign in to start checkout.");
      return;
    }
    if (!res.ok) {
      setMessage(body.error ?? "Checkout failed");
      return;
    }

    if (body.paymentIntent?.clientSecret) {
      setMessage(
        `Payment-ready intent created (${body.provider}). Client secret issued for ${body.plan.name}.`,
      );
      return;
    }
    setMessage(body.message ?? `${body.plan?.name ?? "Plan"} ready.`);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
      {membershipPlans.map((plan) => (
        <article
          key={plan.id}
          className={`rounded-[22px] border p-6 ${
            plan.highlighted
              ? "border-[#0F766E] bg-white shadow-[0_20px_40px_-28px_rgba(15,118,110,0.35)]"
              : "border-[#E5E7EB] bg-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
            {plan.highlighted ? "Popular" : "Plan"}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-[#111827]">{plan.name}</h3>
          <p className="mt-2 text-3xl font-semibold text-[#111827]">
            {plan.priceMonthly === 0 ? "Free" : `$${plan.priceMonthly}`}
            {plan.priceMonthly > 0 ? (
              <span className="text-sm font-normal text-[#6B7280]">/mo</span>
            ) : null}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{plan.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-[#374151]">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => void checkout(plan.id)}
            disabled={pendingPlan === plan.id}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pendingPlan === plan.id ? "Starting…" : plan.priceMonthly === 0 ? "Continue free" : "Start checkout"}
          </button>
        </article>
      ))}
      {message ? (
        <p className="md:col-span-3 rounded-xl bg-[#F0FDFA] px-4 py-3 text-sm text-[#0F766E]" role="status">
          {message}{" "}
          <Link href={ROUTES.login} className="font-semibold underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          if prompted.
        </p>
      ) : null}
    </div>
  );
}
