export enum FiscalCanaryGateStatus {
  PASS_SIMULATED = "PASS_SIMULATED",
  FAIL_BLOCKED = "FAIL_BLOCKED",
  NEEDS_REVIEW = "NEEDS_REVIEW",
  INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"
}

export enum FiscalCanaryGateCheckStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  WARNING = "WARNING",
  NOT_APPLICABLE = "NOT_APPLICABLE"
}

export interface FiscalCanaryGateCheck {
  id: string;
  name: string;
  status: FiscalCanaryGateCheckStatus;
  severity: string;
  reason: string;
  required: boolean;
  source: string;
}

export interface FiscalCanaryPreActivationReport {
  generatedAt: string;
  gateStatus: FiscalCanaryGateStatus;
  approvedForRealCanary: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  readinessScore: number;
  checklist: FiscalCanaryGateCheck[];
  blockers: string[];
  warnings: string[];
  rollbackPlanSummary: any;
  finalRecommendation: string;
}

export interface FiscalCanaryGoNoGoSimulation {
  go: boolean;
  noGo: boolean;
  reason: string;
  blockers: string[];
  warnings: string[];
  requiredBeforeActivation: string[];
  approvedForRealCanary: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}
