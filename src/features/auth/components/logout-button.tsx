"use client";

import { logoutAction } from "../actions";
import { Button } from "@/shared/ui";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline" fullWidth>
        Sign out
      </Button>
    </form>
  );
}
