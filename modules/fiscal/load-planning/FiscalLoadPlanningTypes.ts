export enum FiscalLoadPlanningMode {
  PLANNING_ONLY = 'PLANNING_ONLY',
  SYNTHETIC_ESTIMATION_ONLY = 'SYNTHETIC_ESTIMATION_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalLoadPlanningStatus {
  ESTIMATE_READY = 'ESTIMATE_READY',
  BLOCKED_BY_REAL_TRAFFIC_ATTEMPT = 'BLOCKED_BY_REAL_TRAFFIC_ATTEMPT',
  BLOCKED_BY_CRITICAL_DEPENDENCY = 'BLOCKED_BY_CRITICAL_DEPENDENCY',
  BLOCKED_BY_GUARDRAIL = 'BLOCKED_BY_GUARDRAIL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalSyntheticLoadScenario {
  id: string;
  name: string;
  routeGroup: string;
  syntheticOnly: true;
  callsRealEndpoint: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  invokesSefaz: false;
  signsXml: false;
  generatesPdf: false;
  writesFiscalTables: false;
  estimatedRequestsPerMinute: number;
  estimatedPayloadShapeSize: string;
  risk: string;
}

export interface FiscalLoadEstimateInput {
  scenarioIds: string[];
  durationMinutes: number;
  targetRpm: number;
  metadata?: any;
  requestedBy?: string;
  companyId: string;
}

export interface FiscalLoadEstimateResult {
  success: boolean;
  status: FiscalLoadPlanningStatus | string;
  scenarioCount: number;
  estimatedTotalRequests: number;
  estimatedPeakRpm: number;
  warnings: string[];
  blockers: string[];
  planningOnly: true;
  syntheticOnly: true;
  loadExecuted: false;
  callsRealEndpoint: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  routeToV2: false;
  routeToLegacy: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRealLoadTest: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalLoadPlanningReport {
  generatedAt: string;
  scenarios: FiscalSyntheticLoadScenario[];
  guardrails: string[];
  riskSummary: Record<string, number>;
  lastEstimates: any[];
  readOnly: true;
  planningOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
