export enum FiscalLegalAuditClosureStatus {
  LEGAL_AUDIT_GOVERNANCE_CLOSURE_READY = 'LEGAL_AUDIT_GOVERNANCE_CLOSURE_READY',
  AUDITOR_HANDOFF_EVIDENCE_PACKAGE_READY = 'AUDITOR_HANDOFF_EVIDENCE_PACKAGE_READY',
  BLOCKED_FOR_REAL_LEGAL_AUDIT_ACTIVATION = 'BLOCKED_FOR_REAL_LEGAL_AUDIT_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalAuditClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  closurePurpose?: string;
  auditorRef?: string;
  metadata?: any;
  forceCreateRealLedger?: boolean;
  forcePersistLegalTrail?: boolean;
  forceMakeLegalTrailDefinitive?: boolean;
  forceCalculateRealHash?: boolean;
  forceSignLegalTrail?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceExecuteMigration?: boolean;
  forceExecuteDdl?: boolean;
  forceExecuteDml?: boolean;
  forceInsert?: boolean;
  forceUpdate?: boolean;
  forceDelete?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceUnlockGate?: boolean;
  forceCallExternalEndpoint?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalLegalAuditClosureResult {
  success: boolean;
  status: FiscalLegalAuditClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  closureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  auditorHandoffGenerated: boolean;
  retentionHandoffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalAuditGovernanceClosureOnly: true;
  auditorHandoffEvidenceOnly: true;
  realLedgerCreated: false;
  legalAuditEventPersisted: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
  realHashCalculated: false;
  legalHashDefinitive: false;
  legalTrailSigned: false;
  realSignatureApplied: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  schemaApplied: false;
  migrationExecuted: false;
  ddlExecuted: false;
  dmlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
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
  approvedForLegalAuditGovernanceClosure: true;
  approvedForAuditorHandoffEvidencePackage: true;
  approvedForRealLedgerCreation: false;
  approvedForRealLegalTrailPersistence: false;
  approvedForRealHashCalculation: false;
  approvedForRealLegalTrailSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForProductionV2: false;
}
