import type { ErrorCode } from "@/lib/errors";

/**
 * Shared types for the API client layer.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  /** Query string parameters appended to the URL. */
  readonly params?: Record<string, string | number | boolean | undefined>;
  /** Additional headers merged over the defaults. */
  readonly headers?: Record<string, string>;
  /** Per-request timeout in milliseconds. */
  readonly timeoutMs?: number;
  /** Pass an external AbortSignal to cancel the request. */
  readonly signal?: AbortSignal;
}

/** Standard success envelope returned by the client. */
export interface ApiSuccess<T> {
  readonly ok: true;
  readonly status: number;
  readonly data: T;
}

/** Standard failure envelope returned by the client. */
export interface ApiFailure {
  readonly ok: false;
  readonly status?: number;
  readonly error: {
    readonly code: ErrorCode;
    readonly message: string;
    readonly details?: Record<string, unknown>;
  };
}

/** Discriminated union — narrow with `if (result.ok)`. */
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
