export enum FiscalRealApprovalRecordClosureStatus {
  APPROVAL_RECORD_CLOSURE_READY = 'APPROVAL_RECORD_CLOSURE_READY',
  EVIDENCE_PACKAGE_READY = 'EVIDENCE_PACKAGE_READY',
  HANDOFF_READY = 'HANDOFF_READY',
  BLOCKED_FOR_REAL_APPROVAL_RECORD = 'BLOCKED_FOR_REAL_APPROVAL_RECORD',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalRecordClosureResult {
  success: boolean;
  status: FiscalRealApprovalRecordClosureStatus | string;
  closureExecuted: boolean;
  evidencePackageGenerated: boolean;
  handoffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  approvalRecordClosureOnly: true;
  evidencePackageOnly: true;
  approvalRecordBlueprintOnly: true;
  dryRunPersistenceOnly: true;
  auditTrailSimulationOnly: true;
  approvalRecordDryRunStored: true;
  approvalRecordPersisted: false;
  approvalRecordSigned: false;
  approvalRecordExecutable: false;
  signatureEnvelopeExecutable: false;
  signatureEnvelopeSigned: false;
  signatureEnvelopePersisted: false;
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
  approvedForApprovalRecordClosure: true;
  approvedForApprovalRecordEvidencePackage: true;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForIacApply: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
