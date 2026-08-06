"use client";

import { useActionState } from "react";
import type { Session } from "next-auth";

import { FormField, SubmitButton } from "@/shared/ui";
import { updateProfileAction } from "../actions";
import type { ActionResult } from "../types";

interface ProfileFormProps {
  session: Session;
}

export function ProfileForm({ session }: ProfileFormProps) {
  const [state, formAction] = useActionState<ActionResult | undefined, FormData>(
    updateProfileAction,
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
        id="name"
        label="Full name"
        defaultValue={session.user.name}
        errors={state?.errors?.name}
        required
      />
      <FormField
        id="image"
        label="Profile photo URL"
        type="url"
        placeholder="https://example.com/avatar.jpg"
        defaultValue={session.user.image ?? ""}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-coffee-800">Email</label>
        <input
          type="email"
          value={session.user.email}
          disabled
          className="rounded-lg border border-cream-300 bg-cream-100 px-4 py-2.5 text-sm text-coffee-500 cursor-not-allowed"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-coffee-800">Role</label>
        <input
          type="text"
          value={session.user.role}
          disabled
          className="rounded-lg border border-cream-300 bg-cream-100 px-4 py-2.5 text-sm text-coffee-500 capitalize cursor-not-allowed"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-coffee-800">Email verified</label>
        <input
          type="text"
          value={session.user.isEmailVerified ? "Yes" : "No"}
          disabled
          className="rounded-lg border border-cream-300 bg-cream-100 px-4 py-2.5 text-sm text-coffee-500 cursor-not-allowed"
        />
      </div>
      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
        <h3 className="text-sm font-semibold text-coffee-900">Preferences</h3>
        <div className="mt-3 flex flex-col gap-3 text-sm text-coffee-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="emailNotifications"
              defaultChecked={session.user.preferences?.emailNotifications ?? true}
              className="h-4 w-4 rounded border-cream-300"
            />
            Email notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pushNotifications"
              defaultChecked={session.user.preferences?.pushNotifications ?? true}
              className="h-4 w-4 rounded border-cream-300"
            />
            Push notifications
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Privacy</span>
            <select
              name="privacyMode"
              defaultValue={session.user.preferences?.privacyMode ?? "private"}
              className="rounded-lg border border-cream-300 bg-white px-3 py-2 text-sm"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
      </div>
      <SubmitButton>Update profile</SubmitButton>
    </form>
  );
}
