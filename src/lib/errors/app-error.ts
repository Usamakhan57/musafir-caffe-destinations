/**
 * Typed application errors.
 *
 * Throw these for expected failure modes so error handling can
 * distinguish operational errors from unexpected programmer errors.
 */

export type ErrorCode =
  | "UNKNOWN"
  | "NETWORK"
  | "TIMEOUT"
  | "HTTP"
  | "VALIDATION"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN";

export interface AppErrorOptions {
  /** Machine-readable error code for handling/telemetry. */
  readonly code?: ErrorCode;
  /** HTTP status code when the error originates from a response. */
  readonly status?: number;
  /** Structured details safe to log (never include secrets). */
  readonly details?: Record<string, unknown>;
  /** The original error, preserved for stack traces. */
  readonly cause?: unknown;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly details?: Record<string, unknown>;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = options.code ?? "UNKNOWN";
    this.status = options.status;
    this.details = options.details;
  }
}

export class NetworkError extends AppError {
  constructor(message = "Network request failed", options: AppErrorOptions = {}) {
    super(message, { ...options, code: "NETWORK" });
    this.name = "NetworkError";
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Request timed out", options: AppErrorOptions = {}) {
    super(message, { ...options, code: "TIMEOUT" });
    this.name = "TimeoutError";
  }
}

export class HttpError extends AppError {
  constructor(
    status: number,
    message = `Request failed with status ${status}`,
    options: AppErrorOptions = {},
  ) {
    super(message, { ...options, code: "HTTP", status });
    this.name = "HttpError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", options: AppErrorOptions = {}) {
    super(message, { ...options, code: "VALIDATION" });
    this.name = "ValidationError";
  }
}
