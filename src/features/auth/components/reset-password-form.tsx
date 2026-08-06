"use client";

import { useActionState } from "react";

import { FormField, SubmitButton } from "@/shared/ui";
import { resetPasswordAction } from "../actions";
import type { ActionResult } from "../types";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    resetPasswordAction,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="token" value={token} />
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
        id="password"
        label="New password"
        type="password"
        placeholder="Min. 8 characters"
        errors={state?.errors?.password}
        required
      />
      <FormField
        id="confirmPassword"
        label="Confirm new password"
        type="password"
        placeholder="Repeat your password"
        errors={state?.errors?.confirmPassword}
        required
      />
      <SubmitButton>Reset password</SubmitButton>
    </form>
  );
}
