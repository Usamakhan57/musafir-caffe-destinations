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
      {state?.message && !state.success && (
        <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {state.message}
        </p>
      )}
      <FormField
        id="name"
        label="Full name"
        placeholder="Jane Doe"
        errors={state?.errors?.name}
        required
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        errors={state?.errors?.email}
        required
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        errors={state?.errors?.password}
        required
      />
      <FormField
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        errors={state?.errors?.confirmPassword}
        required
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className="text-sm font-medium text-coffee-800">
          I am a
        </label>
        <select
          id="role"
          name="role"
          defaultValue="traveler"
          className="rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-coffee-900"
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
