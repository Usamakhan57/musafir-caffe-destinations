"use client";

import { useActionState } from "react";

import { FormField, SubmitButton } from "@/shared/ui";
import { registerAction } from "../actions";
import type { ActionResult } from "../types";
import { OAuthButtons } from "./oauth-buttons";

export function RegisterForm() {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    registerAction,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.message && !state.success ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <FormField
        id="name"
        label="Full name"
        placeholder="Jane Doe"
        errors={state?.errors?.name}
        autoComplete="name"
        required
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        errors={state?.errors?.email}
        autoComplete="email"
        required
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        errors={state?.errors?.password}
        autoComplete="new-password"
        required
      />
      <FormField
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        errors={state?.errors?.confirmPassword}
        autoComplete="new-password"
        required
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className="text-sm font-medium text-[#111827]">
          I am a
        </label>
        <select
          id="role"
          name="role"
          defaultValue="traveler"
          className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
        >
          <option value="traveler">Traveler</option>
          <option value="cafe-owner">Cafe owner</option>
          <option value="guide-creator">Guide creator</option>
        </select>
      </div>
      <SubmitButton>Create account</SubmitButton>
      <OAuthButtons />
    </form>
  );
}
