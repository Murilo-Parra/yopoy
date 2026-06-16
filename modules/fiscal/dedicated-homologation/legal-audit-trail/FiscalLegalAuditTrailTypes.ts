export enum FiscalLegalAuditTrailStatus {
  LEGAL_AUDIT_LEDGER_BLUEPRINT_READY = 'LEGAL_AUDIT_LEDGER_BLUEPRINT_READY',
  PERSISTENCE_ISOLATION_CONTRACT_READY = 'PERSISTENCE_ISOLATION_CONTRACT_READY',
  BLOCKED_FOR_REAL_LEDGER_PERSISTENCE = 'BLOCKED_FOR_REAL_LEDGER_PERSISTENCE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalAuditTrailInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  auditPurpose?: string;
  metadata?: any;
  forceCreateRealLedger?: boolean;
  forcePersistLegalTrail?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceInsert?: boolean;
  forceUpdate?: boolean;
  forceDelete?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forceSignApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceUnlockGate?: boolean;
  forceCallExternalEndpoint?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalLegalAuditTrailResult {
  success: boolean;
  status: FiscalLegalAuditTrailStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  ledgerBlueprintGenerated: boolean;
  persistenceIsolationContractGenerated: boolean;
  immutabilityContractGenerated: boolean;
  retentionPolicyGenerated: boolean;
  accessControlMatrixGenerated: boolean;
  evidenceModelGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalAuditLedgerBlueprintOnly: true;
  persistenceIsolationContractOnly: true;
  realLedgerCreated: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
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
  externalEndpointCalled: false;
  externalApproverNotified: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
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
  approvedForLegalAuditLedgerBlueprint: true;
  approvedForPersistenceIsolationContract: true;
  approvedForRealLedgerCreation: false;
  approvedForRealLegalTrailPersistence: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
}
