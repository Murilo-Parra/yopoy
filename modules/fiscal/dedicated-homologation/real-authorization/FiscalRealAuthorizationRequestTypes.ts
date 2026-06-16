export enum FiscalRealAuthorizationStatus {
  AUTHORIZATION_REQUEST_INTAKE_READY = 'AUTHORIZATION_REQUEST_INTAKE_READY',
  NON_EXECUTABLE_APPROVAL_ENVELOPE_READY = 'NON_EXECUTABLE_APPROVAL_ENVELOPE_READY',
  BLOCKED_FOR_REAL_AUTHORIZATION = 'BLOCKED_FOR_REAL_AUTHORIZATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealAuthorizationDomain {
  REQUEST_INTAKE = 'REQUEST_INTAKE',
  APPROVAL_ENVELOPE = 'APPROVAL_ENVELOPE',
  DUAL_APPROVAL = 'DUAL_APPROVAL',
  CHANGE_WINDOW = 'CHANGE_WINDOW',
  IAC = 'IAC',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  PRODUCTION_V2 = 'PRODUCTION_V2'
}

export interface FiscalRealAuthorizationRequestInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  justification?: string;
  requestedDomains?: FiscalRealAuthorizationDomain[];
  metadata?: any;
  approverA?: string;
  approverB?: string;
  forceUnlockGate?: boolean;
  forceAuthorizeRealExecution?: boolean;
  forceStartExecution?: boolean;
  forceTerraformApply?: boolean;
  forcePulumiUp?: boolean;
  forceCloudDeploy?: boolean;
  forceCreateRealDatabase?: boolean;
  forceCreateRealVault?: boolean;
  forceWriteRealSecret?: boolean;
  forceLoadRealCertificate?: boolean;
  forceCallRealSefaz?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealAuthorizationResult {
  success: boolean;
  status: FiscalRealAuthorizationStatus | string;
  intakeAccepted: boolean;
  requestValidated: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  nonExecutableEnvelopeGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  authorizationRequestPersisted: false;
  authorizationEnvelopeExecutable: false;
  authorizationEnvelopeSigned: false;
  authorizationEnvelopePersisted: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
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
  authorizationRequestIntakeOnly: true;
  nonExecutableApprovalEnvelopeOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForAuthorizationRequestIntake: true;
  approvedForNonExecutableEnvelope: true;
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

export interface FiscalRealAuthorizationReport {
  generatedAt: string;
  status: FiscalRealAuthorizationStatus | string;
  policy: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  nonExecutableEnvelope: any;
  recommendations: string[];
  readOnly: true;
  authorizationRequestIntakeOnly: true;
  nonExecutableApprovalEnvelopeOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForAuthorizationRequestIntake: true;
  approvedForNonExecutableEnvelope: true;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
