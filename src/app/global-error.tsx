"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-5 text-[#111827]">
        <div
          role="alert"
          className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
            500
          </p>
          <AlertTriangle className="mx-auto mt-4 h-10 w-10 text-[#0F766E]" aria-hidden />
          <h1 className="mt-4 font-serif text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-sm text-[#6B7280]">
            A critical error interrupted the page. You can try loading it again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
