export enum FiscalReleaseReadinessClosureStatus {
  CLOSED_AS_GOVERNANCE_ONLY = 'CLOSED_AS_GOVERNANCE_ONLY',
  CLOSED_WITH_WARNINGS = 'CLOSED_WITH_WARNINGS',
  BLOCKED_FOR_REAL_RELEASE = 'BLOCKED_FOR_REAL_RELEASE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalReleaseReadinessClosureDomain {
  RELEASE_GATE = 'RELEASE_GATE',
  ROLLBACK_PLANNING = 'ROLLBACK_PLANNING',
  CIRCUIT_BREAKER_PLANNING = 'CIRCUIT_BREAKER_PLANNING',
  KILL_SWITCH_PLANNING = 'KILL_SWITCH_PLANNING',
  SEFAZ_HOMOLOGATION_PLANNING = 'SEFAZ_HOMOLOGATION_PLANNING',
  LOAD_PLANNING = 'LOAD_PLANNING',
  SHADOW_MIRROR = 'SHADOW_MIRROR',
  SANDBOX_PERSISTENCE = 'SANDBOX_PERSISTENCE',
  CANARY_CONTROL = 'CANARY_CONTROL',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  XML_PDF_ISOLATION = 'XML_PDF_ISOLATION',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalReleaseReadinessClosureInventoryItem {
  domain: FiscalReleaseReadinessClosureDomain | string;
  implemented: boolean;
  hasRoutes: boolean;
  hasRuntimeSideEffects: false;
  readOnly: boolean;
  governanceOnly: boolean;
  releasePlanningOnly: boolean;
  planningOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  rollbackExecuted: false;
  circuitBreakerInstalled: false;
  killSwitchActivated: false;
  sefazHomologationActivated: false;
  sefazCalled: false;
  xmlSigned: false;
  pdfGenerated: false;
  trafficChanged: false;
  workerCreated: false;
  schedulerCreated: false;
  routeToV2: false;
  routeToLegacy: true;
  notes: string;
}

export interface FiscalReleaseReadinessClosureCriterion {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  evidence: string;
  blockerForRealRelease: boolean;
}

export interface FiscalReleaseReadinessClosureEvidence {
  generatedAt: string;
  releaseGatePresent: boolean;
  rollbackPlanningPresent: boolean;
  circuitBreakerPlanningPresent: boolean;
  killSwitchPlanningPresent: boolean;
  sefazHomologationPlanningPresent: boolean;
  realReleaseExecuted: false;
  realCanaryActivated: false;
  productionV2Activated: false;
  rollbackExecuted: false;
  circuitBreakerInstalled: false;
  killSwitchActivated: false;
  sefazHomologationActivated: false;
  sefazCalled: false;
  xmlSigned: false;
  pdfGenerated: false;
  trafficChanged: false;
  endpointsCalled: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  governanceOnly: true;
  releasePlanningOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealRelease: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalReleaseReadinessClosureRisk {
  id: string;
  severity: string;
  description: string;
  mitigation: string;
  blockerForRealRelease: boolean;
}

export interface FiscalReleaseReadinessClosureHandoff {
  generatedAt: string;
  currentModule: string;
  nextRecommendedDomain: string;
  allowedNextActions: string[];
  forbiddenNextActions: string[];
  blockersBeforeRealRelease: string[];
  blockersBeforeRealCanary: string[];
  blockersBeforeProductionV2: string[];
  readOnly: true;
  governanceOnly: true;
  releasePlanningOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealRelease: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalReleaseReadinessClosureFinalReport {
  generatedAt: string;
  status: FiscalReleaseReadinessClosureStatus | string;
  inventory: FiscalReleaseReadinessClosureInventoryItem[];
  criteria: FiscalReleaseReadinessClosureCriterion[];
  evidence: FiscalReleaseReadinessClosureEvidence;
  risks: FiscalReleaseReadinessClosureRisk[];
  handoff: FiscalReleaseReadinessClosureHandoff;
  recommendations: string[];
  readOnly: true;
  governanceOnly: true;
  releasePlanningOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealRelease: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
