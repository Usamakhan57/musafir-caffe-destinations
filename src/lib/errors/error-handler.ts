import { AppError } from "./app-error";

/**
 * Helpers to normalize unknown thrown values into `AppError`
 * and to derive safe, user-facing messages.
 */

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Convert any thrown value into an `AppError`, preserving
 * already-typed errors as-is.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, { cause: error });
  }

  return new AppError("An unexpected error occurred", {
    details: { thrown: error },
  });
}

/**
 * A message that is safe to show to end users.
 * Operational errors keep their message; anything else is masked.
 */
export function getUserMessage(error: unknown): string {
  const appError = toAppError(error);
  return appError.code === "UNKNOWN"
    ? "Something went wrong. Please try again."
    : appError.message;
}
