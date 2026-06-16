export enum FiscalLegalAuditImmutabilityStatus {
  IMMUTABILITY_HASH_SIMULATION_READY = 'IMMUTABILITY_HASH_SIMULATION_READY',
  MOCK_EVIDENCE_SIGNATURE_READY = 'MOCK_EVIDENCE_SIGNATURE_READY',
  BLOCKED_FOR_REAL_IMMUTABILITY = 'BLOCKED_FOR_REAL_IMMUTABILITY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalAuditImmutabilityInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  evidencePurpose?: string;
  eventRef?: string;
  approvalRecordRef?: string;
  actorRef?: string;
  metadata?: any;
  forceCalculateRealHash?: boolean;
  forceSignLegalTrail?: boolean;
  forceSignApprovalRecord?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceCallExternalEndpoint?: boolean;
  forcePersistLegalTrail?: boolean;
  forcePersistLegalEvent?: boolean;
  forcePersistApprovalRecord?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCommit?: boolean;
  forceConnectRealDatabase?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceUnlockGate?: boolean;
  forceCallRealSefaz?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalLegalAuditImmutabilityResult {
  success: boolean;
  status: FiscalLegalAuditImmutabilityStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  hashChainPlanGenerated: boolean;
  mockHashGenerated: boolean;
  evidenceDigestGenerated: boolean;
  mockSignatureEnvelopeGenerated: boolean;
  integrityVerificationSimulated: boolean;
  evidencePackageGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalAuditImmutabilitySimulationOnly: true;
  mockEvidenceSignatureOnly: true;
  realHashCalculated: false;
  legalHashDefinitive: false;
  realSignatureApplied: false;
  legalTrailSigned: false;
  approvalRecordSigned: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  externalEndpointCalled: false;
  externalApproverNotified: false;
  legalAuditEventPersisted: false;
  legalAuditTrailPersisted: false;
  approvalRecordPersisted: false;
  dmlExecuted: false;
  ddlExecuted: false;
  insertExecuted: false;
  updateExecuted: false;
  deleteExecuted: false;
  commitExecuted: false;
  realDatabaseConnected: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
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
  approvedForImmutabilityHashSimulation: true;
  approvedForMockEvidenceSignature: true;
  approvedForRealHashCalculation: false;
  approvedForRealLegalTrailSignature: false;
  approvedForRealCertificateLoad: false;
  approvedForRealLegalTrailPersistence: false;
  approvedForRealAuthorizationGrant: false;
  approvedForProductionV2: false;
}
