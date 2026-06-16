export enum FiscalShadowReplayGovernanceStatus {
  EMPTY = "EMPTY",
  OBSERVING_MANUAL_SIMULATIONS = "OBSERVING_MANUAL_SIMULATIONS",
  REVIEW_READY = "REVIEW_READY",
  BLOCKED_BY_RISK = "BLOCKED_BY_RISK",
  NOT_APPROVED_FOR_REAL_CANARY = "NOT_APPROVED_FOR_REAL_CANARY"
}

export interface FiscalShadowReplayGovernanceSnapshot {
  generatedAt: string;
  source: string;
  totalQueueItems: number;
  totalManualCaptures: number;
  totalBatchRuns: number;
  totalMetricsAvailable: number;
  status: FiscalShadowReplayGovernanceStatus;
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
}

export interface FiscalShadowReplayGovernanceChecklistItem {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  reason: string;
  requiredBeforeActivation: boolean;
}

export interface FiscalShadowReplayGovernanceRisk {
  id: string;
  severity: string;
  description: string;
  mitigation: string;
  blockerForRealActivation: boolean;
}

export interface FiscalShadowReplayGovernanceExport {
  generatedAt: string;
  version: string;
  status: FiscalShadowReplayGovernanceStatus;
  snapshot: FiscalShadowReplayGovernanceSnapshot;
  checklist: FiscalShadowReplayGovernanceChecklistItem[];
  risks: FiscalShadowReplayGovernanceRisk[];
  recommendations: string[];
  finalDecision: FiscalShadowReplayGovernanceFinalReview;
  message: string;
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
  payloadIncluded: boolean;
  sensitiveDataIncluded: boolean;
}

export interface FiscalShadowReplayGovernanceFinalReview {
  go: boolean;
  noGo: boolean;
  reason: string;
  requiredBeforeGo: string[];
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}
