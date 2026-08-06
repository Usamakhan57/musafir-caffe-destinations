"use client";

import { useActionState } from "react";

import { FormField, SubmitButton } from "@/shared/ui";
import { changePasswordAction, logoutAllAction, deleteAccountAction } from "../actions";
import type { ActionResult } from "../types";

export function AccountSettings() {
  const [passwordState, passwordAction] = useActionState<ActionResult | undefined, FormData>(
    changePasswordAction,
    undefined,
  );
  const [logoutState, logoutAction] = useActionState<ActionResult | undefined, FormData>(
    async () => {
      const result = await logoutAllAction();
      return result;
    },
    undefined,
  );
  const [deleteState, deleteAction] = useActionState<ActionResult | undefined, FormData>(
    async () => {
      const result = await deleteAccountAction();
      return result;
    },
    undefined,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-cream-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-coffee-900">Security</h2>
        <p className="mt-1 text-sm text-coffee-500">Change your password and rotate sessions across devices.</p>
        {passwordState?.message && (
          <p
            className={`mt-4 rounded-lg p-3 text-sm ${
              passwordState.success ? "bg-forest-100 text-forest-700" : "bg-red-50 text-red-600"
            }`}
          >
            {passwordState.message}
          </p>
        )}
        <form action={passwordAction} className="mt-4 flex flex-col gap-4">
          <FormField id="currentPassword" label="Current password" type="password" required />
          <FormField id="password" label="New password" type="password" required />
          <FormField id="confirmPassword" label="Confirm new password" type="password" required />
          <SubmitButton>Change password</SubmitButton>
        </form>
      </div>

      <div className="rounded-2xl border border-cream-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-coffee-900">Sessions</h2>
        <p className="mt-1 text-sm text-coffee-500">Sign out everywhere and require a fresh login.</p>
        {logoutState?.message && (
          <p className={`mt-4 rounded-lg p-3 text-sm ${logoutState.success ? "bg-forest-100 text-forest-700" : "bg-red-50 text-red-600"}`}>
            {logoutState.message}
          </p>
        )}
        <form action={logoutAction} className="mt-4">
          <SubmitButton className="w-full rounded-lg border border-cream-300 bg-cream-50 px-6 py-2.5 text-sm font-semibold text-coffee-700 transition-colors hover:bg-cream-100">
            Sign out all devices
          </SubmitButton>
        </form>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-red-700">Danger zone</h2>
        <p className="mt-1 text-sm text-red-600">Deleting your account removes your profile and access permanently.</p>
        {deleteState?.message && (
          <p className={`mt-4 rounded-lg p-3 text-sm ${deleteState.success ? "bg-red-100 text-red-700" : "bg-red-50 text-red-600"}`}>
            {deleteState.message}
          </p>
        )}
        <form action={deleteAction} className="mt-4">
          <SubmitButton className="w-full rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700">
            Delete account
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
