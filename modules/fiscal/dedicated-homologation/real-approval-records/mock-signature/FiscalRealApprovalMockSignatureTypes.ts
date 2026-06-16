export enum FiscalRealApprovalMockSignatureStatus {
  MOCK_SIGNATURE_READY = 'MOCK_SIGNATURE_READY',
  EXTERNAL_AUTHORIZATION_SIMULATION_READY = 'EXTERNAL_AUTHORIZATION_SIMULATION_READY',
  BLOCKED_FOR_REAL_SIGNATURE = 'BLOCKED_FOR_REAL_SIGNATURE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealApprovalMockSignatureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  approvalPurpose?: string;
  approverA?: string;
  approverB?: string;
  metadata?: any;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceSignRealApprovalRecord?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceNotifyExternalApprover?: boolean;
  forceCallExternalAuthorizationEndpoint?: boolean;
  forceCallRealSefaz?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceExecuteDml?: boolean;
  forceUnlockGate?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealApprovalMockSignatureResult {
  success: boolean;
  status: FiscalRealApprovalMockSignatureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  mockSignatureEnvelopeGenerated: boolean;
  mockCertificateGenerated: boolean;
  mockSignatureSimulated: boolean;
  externalAuthorizationSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  mockSignatureOnly: true;
  externalAuthorizationSimulationOnly: true;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  approvalRecordSigned: false;
  realSignatureApplied: false;
  signatureEnvelopePersisted: false;
  externalApproverNotified: false;
  externalEndpointCalled: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  approvalRecordPersisted: false;
  realApprovalRecordCreated: false;
  dmlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
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
  approvedForMockSignatureSimulation: true;
  approvedForExternalAuthorizationSimulation: true;
  approvedForRealApprovalRecordSignature: false;
  approvedForRealCertificateLoad: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealExecutionAuthorization: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
