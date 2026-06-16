export enum FiscalLegalAuditEventDryRunStatus {
  LEGAL_AUDIT_EVENT_DRY_RUN_READY = 'LEGAL_AUDIT_EVENT_DRY_RUN_READY',
  CONTROLLED_LEDGER_DML_SIMULATION_READY = 'CONTROLLED_LEDGER_DML_SIMULATION_READY',
  BLOCKED_FOR_REAL_LEDGER_DML = 'BLOCKED_FOR_REAL_LEDGER_DML',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalAuditEventDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  auditEventPurpose?: string;
  eventType?: string;
  actorRef?: string;
  actorRole?: string;
  approvalRecordRef?: string;
  metadata?: any;
  forcePersistLegalEvent?: boolean;
  forcePersistLegalTrail?: boolean;
  forceExecuteDml?: boolean;
  forceInsert?: boolean;
  forceUpdate?: boolean;
  forceDelete?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceUnlockGate?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceCallExternalEndpoint?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalLegalAuditEventDryRunResult {
  success: boolean;
  status: FiscalLegalAuditEventDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  eventModelPlanGenerated: boolean;
  appendSimulationGenerated: boolean;
  correctionSimulationGenerated: boolean;
  retentionEventSimulationGenerated: boolean;
  linkagePlanGenerated: boolean;
  mutationDiffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalAuditEventDryRunOnly: true;
  controlledLedgerDmlSimulationOnly: true;
  legalAuditEventPersisted: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
  approvalRecordPersisted: false;
  realDataSeeded: false;
  dmlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
  rlsApplied: false;
  createIndexExecuted: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  externalEndpointCalled: false;
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
  approvedForLegalAuditEventDryRunClosure: true;
  approvedForControlledLedgerDmlSimulation: true;
  approvedForRealLegalEventPersistence: false;
  approvedForRealLegalTrailPersistence: false;
  approvedForRealDmlExecution: false;
  approvedForRealInsert: false;
  approvedForRealUpdate: false;
  approvedForRealDelete: false;
  approvedForRealCommit: false;
  approvedForRealAuthorizationGrant: false;
  approvedForProductionV2: false;
}
