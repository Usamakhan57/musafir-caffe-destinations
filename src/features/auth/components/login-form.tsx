"use client";

import { useActionState } from "react";

import { FormField, SubmitButton } from "@/shared/ui";
import { loginAction } from "../actions";
import type { ActionResult } from "../types";
import { OAuthButtons } from "./oauth-buttons";

export function LoginForm() {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    loginAction,
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
        placeholder="Enter your password"
        errors={state?.errors?.password}
        required
      />
      <label className="flex items-center gap-2 text-sm text-coffee-700">
        <input type="checkbox" name="remember" className="h-4 w-4 rounded border-cream-300" />
        Keep me signed in
      </label>
      <SubmitButton>Sign in</SubmitButton>
      <OAuthButtons />
    </form>
  );
}
