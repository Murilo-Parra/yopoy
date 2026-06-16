export enum FiscalShadowReplayClosureStatus {
  CLOSED_WITH_GUARDRAILS = "CLOSED_WITH_GUARDRAILS",
  CLOSED_WITH_WARNINGS = "CLOSED_WITH_WARNINGS",
  BLOCKED_FOR_REAL_ACTIVATION = "BLOCKED_FOR_REAL_ACTIVATION"
}

export enum FiscalShadowReplayClosureDomain {
  SHADOW_TAP = "SHADOW_TAP",
  MANUAL_CAPTURE = "MANUAL_CAPTURE",
  REPLAY_QUEUE = "REPLAY_QUEUE",
  REPLAY_BATCH = "REPLAY_BATCH",
  REPLAY_METRICS = "REPLAY_METRICS",
  REPLAY_GOVERNANCE = "REPLAY_GOVERNANCE",
  SAFE_SHAPE = "SAFE_SHAPE",
  ROUTE_MAPPING = "ROUTE_MAPPING",
  RUNTIME_GUARD = "RUNTIME_GUARD",
  LEGACY_COMPATIBILITY = "LEGACY_COMPATIBILITY",
  BOOT_POLICY = "BOOT_POLICY",
  RLS = "RLS"
}

export interface FiscalShadowReplayClosureInventoryItem {
  domain: FiscalShadowReplayClosureDomain;
  implemented: boolean;
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  hasRoutes: boolean;
  hasWorkers: boolean; // must be false
  hasCron: boolean; // must be false
  hasSchemaChange: boolean; // must be false
  notes: string;
}

export interface FiscalShadowReplayClosureGuardrail {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  evidence: string;
  blockerForRealActivation: boolean;
}

export interface FiscalShadowReplayClosureHandoff {
  generatedAt: string;
  currentPhase: string;
  nextRecommendedPhase: string;
  allowedNextActions: string[];
  forbiddenNextActions: string[];
  blockersBeforeRealActivation: string[];
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
}

export interface FiscalShadowReplayClosureFinalReport {
  generatedAt: string;
  status: FiscalShadowReplayClosureStatus;
  inventory: FiscalShadowReplayClosureInventoryItem[];
  guardrails: FiscalShadowReplayClosureGuardrail[];
  handoff: FiscalShadowReplayClosureHandoff;
  recommendations: string[];
  message: string;
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
}
