/**
 * Shared domain-agnostic TypeScript types used across the app.
 */

/** Any value that can be serialized to JSON. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** Standard paginated response shape for list endpoints. */
export interface Paginated<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}

/** Common async operation state for UI consumption. */
export type AsyncStatus = "idle" | "loading" | "success" | "error";
