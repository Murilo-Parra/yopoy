export enum FiscalLoadRunnerMode {
  TOOLING_DESIGN_ONLY = 'TOOLING_DESIGN_ONLY',
  BATCH_PLANNING_ONLY = 'BATCH_PLANNING_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalLoadRunnerStatus {
  BLUEPRINT_READY = 'BLUEPRINT_READY',
  BATCH_PLAN_READY = 'BATCH_PLAN_READY',
  EXECUTION_BLOCKED = 'EXECUTION_BLOCKED',
  BLOCKED_BY_REAL_TRAFFIC_ATTEMPT = 'BLOCKED_BY_REAL_TRAFFIC_ATTEMPT',
  BLOCKED_BY_GUARDRAIL = 'BLOCKED_BY_GUARDRAIL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLoadRunnerBlueprint {
  generatedAt: string;
  supportedScenarioGroups: string[];
  maxPlannedBatchSize: number;
  maxPlannedRpm: number;
  maxPlannedDurationMinutes: number;
  executionEnabled: false;
  loadRunnerInstalled: false;
  workerCreated: false;
  schedulerCreated: false;
  callsRealEndpoint: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  routeToV2: false;
  routeToLegacy: true;
  toolingDesignOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
}

export interface FiscalLoadRunnerBatchPlanInput {
  scenarioIds: string[];
  plannedDurationMinutes: number;
  plannedRpm: number;
  plannedConcurrency?: number;
  metadata?: any;
  requestedBy?: string;
  companyId: string;
}

export interface FiscalLoadRunnerBatchPlan {
  success: boolean;
  status: FiscalLoadRunnerStatus | string;
  scenarioIds: string[];
  estimatedTotalRequests: number;
  estimatedConcurrency: number;
  estimatedSyntheticEvents: number;
  warnings: string[];
  blockers: string[];
  executionEnabled: false;
  executionStarted: false;
  loadExecuted: false;
  realTrafficGenerated: false;
  callsRealEndpoint: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  workerCreated: false;
  schedulerCreated: false;
  routeToV2: false;
  routeToLegacy: true;
  toolingDesignOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRealLoadTest: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalLoadRunnerReport {
  generatedAt: string;
  blueprint: FiscalLoadRunnerBlueprint;
  lastBatchPlans: any[];
  guardrails: string[];
  readOnly: true;
  toolingDesignOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
