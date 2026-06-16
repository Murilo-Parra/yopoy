export enum FiscalRollbackPlanningStatus {
  ROLLBACK_PLANNED_ONLY = 'ROLLBACK_PLANNED_ONLY',
  CIRCUIT_BREAKER_PLANNED_ONLY = 'CIRCUIT_BREAKER_PLANNED_ONLY',
  KILL_SWITCH_PLANNED_ONLY = 'KILL_SWITCH_PLANNED_ONLY',
  SEFAZ_HOMOLOGATION_PLANNED_ONLY = 'SEFAZ_HOMOLOGATION_PLANNED_ONLY',
  EXECUTION_BLOCKED = 'EXECUTION_BLOCKED',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRollbackPlanningDomain {
  ROLLBACK_MATRIX = 'ROLLBACK_MATRIX',
  CIRCUIT_BREAKER = 'CIRCUIT_BREAKER',
  KILL_SWITCH = 'KILL_SWITCH',
  SEFAZ_HOMOLOGATION = 'SEFAZ_HOMOLOGATION',
  XML_SIGNING_ISOLATION = 'XML_SIGNING_ISOLATION',
  PDF_ISOLATION = 'PDF_ISOLATION',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  RELEASE_GATE = 'RELEASE_GATE',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalRollbackEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceExecute?: boolean;
  metadata?: any;
}

export interface FiscalRollbackEvaluationResult {
  success: boolean;
  status: FiscalRollbackPlanningStatus | string;
  rollbackExecuted: false;
  circuitBreakerInstalled: false;
  killSwitchActivated: false;
  sefazHomologationActivated: false;
  sefazCalled: false;
  xmlSigned: false;
  pdfGenerated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  blockers: string[];
  warnings: string[];
  readOnly: true;
  governanceOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRollbackExecution: false;
  approvedForCircuitBreakerInstall: false;
  approvedForSefazHomologation: false;
  approvedForProductionV2: false;
}

export interface FiscalRollbackFinalReport {
  generatedAt: string;
  status: FiscalRollbackPlanningStatus | string;
  rollbackPlan: any;
  circuitBreakerPlan: any;
  killSwitchPlan: any;
  sefazHomologationPlan: any;
  risks: any[];
  evaluation: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  governanceOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRollbackExecution: false;
  approvedForCircuitBreakerInstall: false;
  approvedForSefazHomologation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
