export enum FiscalRealApprovalSchemaDryRunStatus {
  SCHEMA_MIGRATION_DRY_RUN_READY = 'SCHEMA_MIGRATION_DRY_RUN_READY',
  CONTROLLED_DDL_SIMULATION_READY = 'CONTROLLED_DDL_SIMULATION_READY',
  BLOCKED_FOR_REAL_SCHEMA_CHANGE = 'BLOCKED_FOR_REAL_SCHEMA_CHANGE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalSchemaDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  migrationPurpose?: string;
  metadata?: any;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceCreateTable?: boolean;
  forceAlterTable?: boolean;
  forceDropTable?: boolean;
  forceCreateIndex?: boolean;
  forceApplyRls?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceTerraformApply?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalSchemaDryRunResult {
  success: boolean;
  status: FiscalRealApprovalSchemaDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  migrationPlanGenerated: boolean;
  controlledDdlSimulationGenerated: boolean;
  schemaDiffGenerated: boolean;
  rlsPlanGenerated: boolean;
  indexPlanGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  schemaMigrationDryRunOnly: true;
  controlledDdlSimulationOnly: true;
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
  dmlExecuted: false;
  createTableExecuted: false;
  alterTableExecuted: false;
  dropTableExecuted: false;
  createIndexExecuted: false;
  rlsApplied: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  approvalRecordPersisted: false;
  approvalRecordSigned: false;
  realApprovalRecordCreated: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
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
  approvedForSchemaDryRunClosure: true;
  approvedForControlledDdlSimulation: true;
  approvedForRealSchemaMigration: false;
  approvedForRealDdlExecution: false;
  approvedForRealDmlExecution: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
