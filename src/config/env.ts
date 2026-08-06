/**
 * Centralized, validated environment access.
 *
 * Rules:
 * - Never read `process.env` directly anywhere else in the app.
 * - Add every new environment variable here, with validation and a
 *   sensible fallback for non-sensitive public values.
 * - Validation runs once at module load, so misconfiguration fails fast.
 */

type NodeEnv = "development" | "test" | "production";

export interface EnvConfig {
  /** Current Node environment. */
  readonly nodeEnv: NodeEnv;
  /** Convenience flags derived from `nodeEnv`. */
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly isTest: boolean;
  /** Public base URL of the application. */
  readonly appUrl: string;
  /** Base URL used by the API client layer. */
  readonly apiBaseUrl: string;
  /** Auth secret used by NextAuth/ Auth.js. */
  readonly authSecret: string;
  /** OAuth provider credentials. */
  readonly googleClientId: string | undefined;
  readonly googleClientSecret: string | undefined;
  readonly githubClientId: string | undefined;
  readonly githubClientSecret: string | undefined;
}

function resolveString(
  key: string,
  value: string | undefined,
  fallback?: string,
): string {
  const resolved = value ?? fallback;
  if (resolved === undefined || resolved.trim() === "") {
    // Only reachable for variables without a fallback — treat those as required.
    throw new Error(
      `[env] Missing required environment variable: "${key}". ` +
        `Add it to your .env.local file (see .env.example).`,
    );
  }
  return resolved;
}

function createEnv(): EnvConfig {
  const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;

  return {
    nodeEnv,
    isDevelopment: nodeEnv === "development",
    isProduction: nodeEnv === "production",
    isTest: nodeEnv === "test",
    appUrl: resolveString(
      "NEXT_PUBLIC_APP_URL",
      process.env.NEXT_PUBLIC_APP_URL,
      "http://localhost:3000",
    ),
    apiBaseUrl: resolveString(
      "NEXT_PUBLIC_API_BASE_URL",
      process.env.NEXT_PUBLIC_API_BASE_URL,
      "http://localhost:3000/api",
    ),
    authSecret: resolveString("AUTH_SECRET", process.env.AUTH_SECRET, "development-secret"),
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const env = createEnv();
