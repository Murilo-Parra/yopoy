export enum FiscalRealApprovalPersistenceGateStatus {
  PERSISTENCE_GATE_BLUEPRINT_READY = 'PERSISTENCE_GATE_BLUEPRINT_READY',
  LEGAL_AUDIT_TRAIL_CONTRACT_READY = 'LEGAL_AUDIT_TRAIL_CONTRACT_READY',
  BLOCKED_FOR_REAL_PERSISTENCE = 'BLOCKED_FOR_REAL_PERSISTENCE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalPersistenceGateInput {
  requestId?: string;
  companyId?: string;
  requestedBy?: string;
  forcePersistApprovalRecord?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceInsert?: boolean;
  forceUpdate?: boolean;
  forceDelete?: boolean;
  forceCommit?: boolean;
  forceSignApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceTerraformApply?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalPersistenceGateResult {
  success: boolean;
  status: FiscalRealApprovalPersistenceGateStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  schemaContractGenerated: boolean;
  legalAuditTrailContractGenerated: boolean;
  readinessChecklistGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  persistenceGateBlueprintOnly: true;
  legalAuditTrailContractOnly: true;
  approvalRecordPersisted: false;
  approvalRecordSigned: false;
  realApprovalRecordCreated: false;
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
  approvedForPersistenceGateBlueprintClosure: true;
  approvedForLegalAuditTrailContract: true;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForIacApply: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
