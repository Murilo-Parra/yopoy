export enum FiscalCanaryStatus {
  DISABLED = "DISABLED",
  PLANNED = "PLANNED",
  ELIGIBLE = "ELIGIBLE",
  BLOCKED = "BLOCKED",
  SIMULATION_ONLY = "SIMULATION_ONLY"
}

export enum FiscalCanaryRiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export interface FiscalCanaryRouteCandidate {
  route: string;
  operation: string;
  riskLevel: FiscalCanaryRiskLevel;
  canaryAllowed: boolean;
  reason: string;
  requiredReadinessScore: number;
  requiredSampleSize: number;
  blockerCount?: number;
}

export interface FiscalCanaryEligibilityInput {
  companyId?: string;
  route?: string;
  operation?: string;
  dateFrom?: string;
  dateTo?: string;
  minimumReadinessScore?: number;
  requireNoBlockers?: boolean;
}

export interface FiscalCanaryDecision {
  eligible: boolean;
  status: FiscalCanaryStatus;
  readinessScore?: number;
  blockers: string[];
  warnings: string[];
  allowedRoutes: string[];
  deniedRoutes: string[];
  recommendation: string;
  simulationOnly: boolean;
}
