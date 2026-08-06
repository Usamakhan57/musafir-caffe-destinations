"use client";

import { useActionState } from "react";

import { FormField, SubmitButton } from "@/shared/ui";
import { forgotPasswordAction } from "../actions";
import type { ActionResult } from "../types";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    forgotPasswordAction,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.message && (
        <p
          className={`rounded-lg p-3 text-center text-sm ${
            state.success ? "bg-forest-100 text-forest-700" : "bg-red-50 text-red-600"
          }`}
        >
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
      <SubmitButton>Send reset link</SubmitButton>
    </form>
  );
}
