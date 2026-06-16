export enum FiscalLoadPlanningClosureStatus {
  CLOSED_AS_PLANNING_ONLY = 'CLOSED_AS_PLANNING_ONLY',
  CLOSED_WITH_WARNINGS = 'CLOSED_WITH_WARNINGS',
  BLOCKED_FOR_REAL_LOAD = 'BLOCKED_FOR_REAL_LOAD',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalLoadPlanningClosureDomain {
  SYNTHETIC_SCENARIO_CATALOG = 'SYNTHETIC_SCENARIO_CATALOG',
  LOAD_RISK_CLASSIFIER = 'LOAD_RISK_CLASSIFIER',
  LOAD_PLANNING_POLICY = 'LOAD_PLANNING_POLICY',
  LOAD_PLANNING_GUARDRAILS = 'LOAD_PLANNING_GUARDRAILS',
  LOAD_ESTIMATOR = 'LOAD_ESTIMATOR',
  LOAD_RUNNER_BLUEPRINT = 'LOAD_RUNNER_BLUEPRINT',
  LOAD_RUNNER_POLICY = 'LOAD_RUNNER_POLICY',
  LOAD_RUNNER_BATCH_PLANNER = 'LOAD_RUNNER_BATCH_PLANNER',
  LOAD_RUNNER_GUARDRAILS = 'LOAD_RUNNER_GUARDRAILS',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  XML_PDF_ISOLATION = 'XML_PDF_ISOLATION',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalLoadPlanningClosureInventoryItem {
  domain: FiscalLoadPlanningClosureDomain | string;
  implemented: boolean;
  hasRoutes: boolean;
  hasRuntimeSideEffects: false;
  readOnly: boolean;
  planningOnly: boolean;
  syntheticOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  loadExecuted: false;
  executionEnabled: false;
  executionStarted: false;
  realTrafficGenerated: false;
  callsRealEndpoint: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  workerCreated: false;
  schedulerCreated: false;
  routeToV2: false;
  routeToLegacy: true;
  hasSefaz: false;
  hasXmlSigning: false;
  hasPdfGeneration: false;
  notes: string;
}

export interface FiscalLoadPlanningClosureGuardrail {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  evidence: string;
  blockerForRealLoad: boolean;
}

export interface FiscalLoadPlanningClosureRisk {
  id: string;
  severity: string;
  description: string;
  mitigation: string;
  blockerForRealLoad: boolean;
}

export interface FiscalLoadPlanningClosureEvidence {
  generatedAt: string;
  syntheticScenariosCount: number;
  criticalScenariosBlocked: number;
  lastEstimatesCount: number;
  lastBatchPlansCount: number;
  realLoadExecuted: false;
  realTrafficGenerated: false;
  endpointsCalled: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealLoadTest: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalLoadPlanningClosureHandoff {
  generatedAt: string;
  currentModule: string;
  nextRecommendedDomain: string;
  allowedNextActions: string[];
  forbiddenNextActions: string[];
  blockersBeforeRealLoad: string[];
  blockersBeforeRealCanary: string[];
  readOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealLoadTest: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalLoadPlanningClosureFinalReport {
  generatedAt: string;
  status: FiscalLoadPlanningClosureStatus | string;
  inventory: FiscalLoadPlanningClosureInventoryItem[];
  guardrails: FiscalLoadPlanningClosureGuardrail[];
  risks: FiscalLoadPlanningClosureRisk[];
  evidence: FiscalLoadPlanningClosureEvidence;
  handoff: FiscalLoadPlanningClosureHandoff;
  recommendations: string[];
  readOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealLoadTest: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
