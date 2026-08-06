"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/shared/ui";
import { verifyEmailAction } from "../actions";
import type { ActionResult } from "../types";

interface VerifyEmailFormProps {
  token: string;
}

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    verifyEmailAction,
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
      {!state?.success && <SubmitButton>Verify email</SubmitButton>}
    </form>
  );
}
