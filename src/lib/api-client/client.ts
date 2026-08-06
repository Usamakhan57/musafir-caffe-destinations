import { env } from "@/config/env";
import {
  AppError,
  HttpError,
  NetworkError,
  TimeoutError,
  toAppError,
} from "@/lib/errors";
import { logger } from "@/lib/logger";

import type { ApiRequestOptions, ApiResult, HttpMethod } from "./types";

/**
 * Typed API client.
 *
 * All HTTP traffic to the backend goes through this client so that
 * base URLs, headers, timeouts, error normalization, and logging stay
 * centralized. Authentication headers can be attached here later
 * without touching call sites.
 */

const DEFAULT_TIMEOUT_MS = 10_000;

const log = logger.child("api");

function buildUrl(
  path: string,
  params?: ApiRequestOptions["params"],
): string {
  const url = new URL(path, env.apiBaseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function createTimeoutSignal(
  timeoutMs: number,
  externalSignal?: AbortSignal,
): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException(
    `Request exceeded ${timeoutMs}ms`,
    "TimeoutError",
  )), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort(externalSignal.reason);
    } else {
      externalSignal.addEventListener(
        "abort",
        () => controller.abort(externalSignal.reason),
        { once: true },
      );
    }
  }

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

async function parseBody<T>(response: Response): Promise<T> {
  // 204/205 responses have no body.
  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  options: ApiRequestOptions = {},
): Promise<ApiResult<T>> {
  const url = buildUrl(path, options.params);
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeout = createTimeoutSignal(timeoutMs, options.signal);

  log.debug(`${method} ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: timeout.signal,
    });

    const data = await parseBody<T>(response);

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : `Request failed with status ${response.status}`;

      log.warn(`${method} ${url} → ${response.status}`, { message });
      const error = new HttpError(response.status, message);
      return {
        ok: false,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      };
    }

    return { ok: true, status: response.status, data };
  } catch (cause) {
    const error = normalizeFailure(cause);
    log.error(`${method} ${url} failed`, {
      code: error.code,
      message: error.message,
    });
    return {
      ok: false,
      status: error.status,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  } finally {
    timeout.clear();
  }
}

function normalizeFailure(cause: unknown): AppError {
  if (cause instanceof DOMException && cause.name === "TimeoutError") {
    return new TimeoutError(undefined, { cause });
  }
  if (cause instanceof DOMException && cause.name === "AbortError") {
    return new AppError("Request was aborted", { code: "NETWORK", cause });
  }
  if (cause instanceof TypeError) {
    // fetch rejects with TypeError on network-level failures.
    return new NetworkError(undefined, { cause });
  }
  return toAppError(cause);
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>("PUT", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};

export type ApiClient = typeof apiClient;
