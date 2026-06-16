export enum FiscalRealAuthorizationClosureStatus {
  AUTHORIZATION_CLOSURE_READY = 'AUTHORIZATION_CLOSURE_READY',
  AUTHORIZATION_TRANSITION_GATE_CLOSURE_READY = 'AUTHORIZATION_TRANSITION_GATE_CLOSURE_READY',
  AUTHORIZATION_HANDOFF_READY = 'AUTHORIZATION_HANDOFF_READY',
  BLOCKED_FOR_REAL_AUTHORIZATION = 'BLOCKED_FOR_REAL_AUTHORIZATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealAuthorizationClosureDomain {
  AUTHORIZATION_REQUEST_INTAKE = 'AUTHORIZATION_REQUEST_INTAKE',
  NON_EXECUTABLE_APPROVAL_ENVELOPE = 'NON_EXECUTABLE_APPROVAL_ENVELOPE',
  DUAL_APPROVAL_SIMULATION = 'DUAL_APPROVAL_SIMULATION',
  SEGREGATION_OF_DUTIES = 'SEGREGATION_OF_DUTIES',
  FINAL_AUTHORIZATION_HANDOFF = 'FINAL_AUTHORIZATION_HANDOFF',
  FULL_AUTHORIZATION_STACK = 'FULL_AUTHORIZATION_STACK'
}

export interface FiscalRealAuthorizationClosureResult {
  success: boolean;
  status: FiscalRealAuthorizationClosureStatus | string;
  closureExecuted: boolean;
  handoffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  authorizationClosedDocumentally: true;
  authorizationTransitionGateClosedDocumentally: true;
  authorizationRequestPersisted: false;
  authorizationEnvelopeExecutable: false;
  authorizationEnvelopeSigned: false;
  authorizationEnvelopePersisted: false;
  dualApprovalSimulated: true;
  dualApprovalCompleted: false;
  realApprovalGranted: false;
  realAuthorizationGranted: false;
  approvalRecordPersisted: false;
  approverANotifiedExternally: false;
  approverBNotifiedExternally: false;
  sameUserApprovalBlocked: true;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  realExecutionStarted: false;
  iacApplyApproved: false;
  iacApplied: false;
  terraformApplied: false;
  pulumiApplied: false;
  cloudFormationDeployed: false;
  realResourceCreated: false;
  infrastructureProvisioned: false;
  environmentActivated: false;
  databaseProvisioned: false;
  realDatabaseConnected: false;
  vaultProvisioned: false;
  secretWritten: false;
  secretLoaded: false;
  certificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  realSefazCalled: false;
  endpointCalled: false;
  xmlSigned: false;
  realXmlSigned: false;
  pdfGenerated: false;
  realPdfGenerated: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  authorizationTransitionClosureOnly: true;
  authorizationClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForAuthorizationClosure: true;
  approvedForAuthorizationTransitionClosure: true;
  approvedForRealDualApprovalCompletion: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForExecutionStart: false;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalRealAuthorizationClosureReport {
  generatedAt: string;
  status: FiscalRealAuthorizationClosureStatus | string;
  inventory: any;
  finalChecklist: any;
  evidencePackage: any;
  blockers: any;
  risks: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  authorizationTransitionClosureOnly: true;
  authorizationClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForAuthorizationClosure: true;
  approvedForAuthorizationTransitionClosure: true;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
