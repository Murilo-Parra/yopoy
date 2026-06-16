export enum FiscalShadowMirrorPassiveTapMode {
  DESIGN_ONLY = 'DESIGN_ONLY',
  PLANNING_ONLY = 'PLANNING_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalShadowMirrorPassiveTapStatus {
  DESIGN_READY = 'DESIGN_READY',
  BLOCKED_BY_ROUTE_RISK = 'BLOCKED_BY_ROUTE_RISK',
  BLOCKED_BY_GUARDRAIL = 'BLOCKED_BY_GUARDRAIL',
  BLOCKED_BY_CRITICAL_DEPENDENCY = 'BLOCKED_BY_CRITICAL_DEPENDENCY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalShadowMirrorPassiveTapPoint {
  id: string;
  routeId: string;
  legacyMethod: string;
  legacyPath: string;
  tapCandidate: string;
  risk: string;
  dependencies: string[];
  installableNow: false;
  installed: false;
  active: false;
  capturesRequest: false;
  capturesResponse: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  routeToV2: false;
  routeToLegacy: true;
  designOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorPassiveTapDecision {
  allowed: false;
  installableNow: false;
  reason: string;
  warnings: string[];
  blockers: string[];
  designOnly: true;
  planningOnly: true;
  activationBlocked: true;
}

export interface FiscalShadowMirrorPassiveTapPlan {
  generatedAt: string;
  totalTapPoints: number;
  blockedTapPoints: number;
  futureEligibleTapPoints: number;
  requiredBeforeInstall: string[];
  forbiddenActions: string[];
  designOnly: true;
  planningOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorPassiveTapReport {
  generatedAt: string;
  registry: FiscalShadowMirrorPassiveTapPoint[];
  guardrails: string[];
  plan: FiscalShadowMirrorPassiveTapPlan;
  decisions: any[];
  readOnly: true;
  designOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
