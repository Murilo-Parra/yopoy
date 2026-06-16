export enum FiscalLegalAuditSchemaDryRunStatus {
  LEGAL_AUDIT_SCHEMA_DRY_RUN_READY = 'LEGAL_AUDIT_SCHEMA_DRY_RUN_READY',
  RETENTION_RLS_DDL_SIMULATION_READY = 'RETENTION_RLS_DDL_SIMULATION_READY',
  BLOCKED_FOR_REAL_SCHEMA_CHANGE = 'BLOCKED_FOR_REAL_SCHEMA_CHANGE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalAuditSchemaDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  schemaPurpose?: string;
  metadata?: any;
  forceCreateRealLedger?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceCreateTable?: boolean;
  forceAlterTable?: boolean;
  forceDropTable?: boolean;
  forceCreateIndex?: boolean;
  forceApplyRls?: boolean;
  forceApplyRetentionPolicy?: boolean;
  forceDeleteRetentionData?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forcePersistLegalTrail?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceCallExternalEndpoint?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalLegalAuditSchemaDryRunResult {
  success: boolean;
  status: FiscalLegalAuditSchemaDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  ledgerSchemaPlanGenerated: boolean;
  controlledDdlSimulationGenerated: boolean;
  rlsPlanGenerated: boolean;
  retentionDdlPlanGenerated: boolean;
  indexPlanGenerated: boolean;
  schemaDiffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalAuditSchemaDryRunOnly: true;
  retentionRlsDdlSimulationOnly: true;
  realLedgerCreated: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
  dmlExecuted: false;
  createTableExecuted: false;
  alterTableExecuted: false;
  dropTableExecuted: false;
  createIndexExecuted: false;
  rlsApplied: false;
  retentionPolicyApplied: false;
  retentionDeleteExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  approvalRecordPersisted: false;
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
  approvedForLegalAuditSchemaDryRunClosure: true;
  approvedForRetentionRlsDdlSimulation: true;
  approvedForRealLedgerCreation: false;
  approvedForRealLegalTrailPersistence: false;
  approvedForRealSchemaMigration: false;
  approvedForRealDdlExecution: false;
  approvedForRealDmlExecution: false;
  approvedForRealAuthorizationGrant: false;
  approvedForProductionV2: false;
}
