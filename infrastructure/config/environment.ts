import { RuntimeEnvironment } from "./environment.types";

export function getEnvironment(): RuntimeEnvironment {
  const env = (process.env.NODE_ENV || process.env.APP_ENV || "") as string;
  const lowerEnv = env.toLowerCase();
  
  if (lowerEnv.includes("prod")) return "production";
  if (lowerEnv.includes("stag")) return "staging";
  if (lowerEnv.includes("test")) return "test";
  return "development";
}

export function isProduction(): boolean {
  return getEnvironment() === "production";
}

export function isDevelopment(): boolean {
  return getEnvironment() === "development";
}

export function isTest(): boolean {
  return getEnvironment() === "test";
}

export function hasDatabaseUrl(): boolean {
  const url = process.env.DATABASE_URL || "";
  return url.trim().length > 0 && !url.includes("YOUR-PASSWORD");
}

export function allowLocalFallback(): boolean {
  if (isProduction()) return false;
  return process.env.ALLOW_LOCAL_DB_FALLBACK === "true";
}
