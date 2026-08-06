import { env } from "@/config/env";

/**
 * Leveled, environment-aware logger.
 *
 * - `debug` / `info` output is silenced in production.
 * - `warn` / `error` are always emitted (wire them to an external
 *   monitoring service later in one place).
 * - Use this everywhere instead of raw `console.*` calls.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

function formatScope(scope?: string): string {
  return scope ? `[${scope}]` : "";
}

function write(
  level: LogLevel,
  scope: string | undefined,
  message: string,
  context?: LogContext,
): void {
  // Keep production output actionable: only warnings and errors.
  if (env.isProduction && (level === "debug" || level === "info")) {
    return;
  }

  const prefix = formatScope(scope);

  switch (level) {
    case "debug":
      console.debug(prefix, message, context ?? "");
      break;
    case "info":
      console.info(prefix, message, context ?? "");
      break;
    case "warn":
      console.warn(prefix, message, context ?? "");
      break;
    case "error":
      console.error(prefix, message, context ?? "");
      break;
  }
}

export interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  /** Create a namespaced child logger, e.g. `logger.child("api")`. */
  child: (scope: string) => Logger;
}

function createLogger(scope?: string): Logger {
  return {
    debug: (message, context) => write("debug", scope, message, context),
    info: (message, context) => write("info", scope, message, context),
    warn: (message, context) => write("warn", scope, message, context),
    error: (message, context) => write("error", scope, message, context),
    child: (childScope) =>
      createLogger(scope ? `${scope}:${childScope}` : childScope),
  };
}

export const logger = createLogger();
