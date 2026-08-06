"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "w-full rounded-lg bg-forest-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
      }
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}
