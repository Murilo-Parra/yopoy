export enum FiscalCanaryRuntimeMode {
  HARD_OFF = "HARD_OFF",
  SIMULATION_ONLY = "SIMULATION_ONLY",
  SHADOW_ONLY = "SHADOW_ONLY",
  BLOCKED = "BLOCKED"
}

export interface FiscalCanaryRuntimeDecision {
  routeToV2: boolean;
  routeToLegacy: boolean;
  canaryActive: boolean;
  activationBlocked: boolean;
  simulationOnly: boolean;
  reason: string;
  blockers: string[];
  warnings: string[];
  evaluatedAt: string;
}

export interface FiscalCanaryFeatureFlagSnapshot {
  globalCanaryEnabled: boolean;
  routeCanaryEnabled: boolean;
  tenantCanaryEnabled: boolean;
  killSwitchActive: boolean;
  mode: FiscalCanaryRuntimeMode;
  source: string;
}

export interface FiscalCanaryRuntimeAuditRecord {
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  decision: string;
  reason: string;
  createdAt: string;
}

export interface FiscalCanaryKillSwitchStatus {
  active: boolean;
  reason: string;
  enforcedAt: string;
  canBeBypassed: boolean;
}
