export type RuntimeEnvironment = "development" | "test" | "staging" | "production";

export enum DatabaseBootMode {
  REQUIRED = "REQUIRED",
  OPTIONAL_LOCAL = "OPTIONAL_LOCAL",
  MOCK_ONLY = "MOCK_ONLY"
}

export enum BootDecision {
  ALLOW = "ALLOW",
  DENY = "DENY"
}

export interface BootPolicyResult {
  decision: BootDecision;
  environment: RuntimeEnvironment;
  databaseRequired: boolean;
  allowLocalFallback: boolean;
  reason: string;
  fatal: boolean;
}
