export enum FiscalRealApprovalDmlDryRunStatus {
  DML_SEED_DRY_RUN_READY = 'DML_SEED_DRY_RUN_READY',
  CONTROLLED_DATA_MUTATION_SIMULATION_READY = 'CONTROLLED_DATA_MUTATION_SIMULATION_READY',
  BLOCKED_FOR_REAL_DML = 'BLOCKED_FOR_REAL_DML',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalDmlDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  mutationPurpose?: string;
  metadata?: any;
  forceSeedRealData?: boolean;
  forceExecuteDml?: boolean;
  forceInsert?: boolean;
  forceUpdate?: boolean;
  forceDelete?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceSignApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceTerraformApply?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalDmlDryRunResult {
  success: boolean;
  status: FiscalRealApprovalDmlDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  seedPlanGenerated: boolean;
  insertSimulationGenerated: boolean;
  updateSimulationGenerated: boolean;
  deleteSimulationGenerated: boolean;
  commitPlanGenerated: boolean;
  mutationDiffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  dmlSeedDryRunOnly: true;
  controlledDataMutationSimulationOnly: true;
  realDataSeeded: false;
  dmlExecuted: false;
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
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
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
  approvedForDmlSeedDryRunClosure: true;
  approvedForControlledDataMutationSimulation: true;
  approvedForRealDmlExecution: false;
  approvedForRealInsert: false;
  approvedForRealUpdate: false;
  approvedForRealDelete: false;
  approvedForRealCommit: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
