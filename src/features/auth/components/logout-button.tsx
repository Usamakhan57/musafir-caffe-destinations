"use client";

import { logoutAction } from "../actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-cream-300 px-5 py-2 text-sm font-medium text-coffee-600 transition-colors hover:bg-cream-200"
      >
        Sign out
      </button>
    </form>
  );
}
