export enum FiscalRealApprovalDualClosureStatus {
  DUAL_APPROVAL_CONCLUSION_SIMULATION_READY = 'DUAL_APPROVAL_CONCLUSION_SIMULATION_READY',
  APPROVAL_RECORD_GOVERNANCE_CLOSURE_READY = 'APPROVAL_RECORD_GOVERNANCE_CLOSURE_READY',
  BLOCKED_FOR_REAL_DUAL_APPROVAL = 'BLOCKED_FOR_REAL_DUAL_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalDualClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  approverA?: string;
  approverB?: string;
  approvalPurpose?: string;
  metadata?: any;
  forceCompleteDualApproval?: boolean;
  forceGrantRealAuthorization?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceSignApprovalRecord?: boolean;
  forceLoadRealCertificate?: boolean;
  forceNotifyExternalApprover?: boolean;
  forceCallExternalEndpoint?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceUnlockGate?: boolean;
  forceTerraformApply?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalDualClosureResult {
  success: boolean;
  status: FiscalRealApprovalDualClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  dualConclusionSimulated: boolean;
  sodReviewExecuted: boolean;
  governanceClosureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  dualApprovalConclusionSimulationOnly: true;
  approvalRecordGovernanceClosureOnly: true;
  dualApprovalCompleted: false;
  realApprovalGranted: false;
  realAuthorizationGranted: false;
  approvalRecordPersisted: false;
  approvalRecordSigned: false;
  realApprovalRecordCreated: false;
  realSignatureApplied: false;
  externalApproverNotified: false;
  externalEndpointCalled: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  dmlExecuted: false;
  ddlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  terraformApplied: false;
  pulumiApplied: false;
  cloudFormationDeployed: false;
  infrastructureProvisioned: false;
  realSefazCalled: false;
  endpointCalled: false;
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
  approvedForDualApprovalConclusionSimulation: true;
  approvedForApprovalRecordGovernanceClosure: true;
  approvedForRealDualApprovalCompletion: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
