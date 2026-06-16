export enum FiscalRealApprovalRecordDryRunStatus {
  DRY_RUN_PERSISTENCE_READY = 'DRY_RUN_PERSISTENCE_READY',
  AUDIT_TRAIL_SIMULATION_READY = 'AUDIT_TRAIL_SIMULATION_READY',
  BLOCKED_FOR_REAL_PERSISTENCE = 'BLOCKED_FOR_REAL_PERSISTENCE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalRecordDryRunInput {
  requestId?: string;
  companyId?: string;
  requestedBy?: string;
  approverA?: string;
  approverB?: string;
  approvalPurpose?: string;
  requestedDomains?: string[];
  metadata?: any;
  forcePersistApprovalRecord?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceCommit?: boolean;
  forceSignApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceTerraformApply?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalRecordDryRunResult {
  success: boolean;
  status: FiscalRealApprovalRecordDryRunStatus | string;
  validationExecuted: boolean;
  dryRunPersistenceSimulated: boolean;
  auditTrailSimulated: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  dryRunPersistenceOnly: true;
  auditTrailSimulationOnly: true;
  approvalRecordDryRunStored: true;
  approvalRecordPersisted: false;
  approvalRecordSigned: false;
  approvalRecordExecutable: false;
  realApprovalRecordCreated: false;
  realApprovalGranted: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
  dmlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  realExecutionStarted: false;
  iacApplied: false;
  terraformApplied: false;
  pulumiApplied: false;
  cloudFormationDeployed: false;
  infrastructureProvisioned: false;
  certificateLoaded: false;
  realSefazCalled: false;
  xmlSigned: false;
  pdfGenerated: false;
  productionV2Activated: false;
  trafficChanged: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForDryRunPersistenceSimulation: true;
  approvedForAuditTrailSimulation: true;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForIacApply: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
