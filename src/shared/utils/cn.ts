/**
 * Conditional class-name combiner.
 *
 * Joins class values, dropping falsy entries — the standard helper
 * for composing Tailwind classes. Swap for `clsx`/`tailwind-merge`
 * later without touching call sites if advanced merging is needed.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
