export enum FiscalRealApprovalRecordStatus {
  APPROVAL_RECORD_BLUEPRINT_READY = 'APPROVAL_RECORD_BLUEPRINT_READY',
  NON_EXECUTABLE_SIGNATURE_ENVELOPE_READY = 'NON_EXECUTABLE_SIGNATURE_ENVELOPE_READY',
  BLOCKED_FOR_REAL_APPROVAL_RECORD = 'BLOCKED_FOR_REAL_APPROVAL_RECORD',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealApprovalRecordDomain {
  APPROVAL_RECORD_BLUEPRINT = 'APPROVAL_RECORD_BLUEPRINT',
  APPROVAL_SCHEMA_PLAN = 'APPROVAL_SCHEMA_PLAN',
  SIGNATURE_ENVELOPE = 'SIGNATURE_ENVELOPE',
  DUAL_APPROVAL = 'DUAL_APPROVAL',
  AUTHORIZATION = 'AUTHORIZATION',
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

export interface FiscalRealApprovalRecordInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  approvalPurpose?: string;
  approverA?: string;
  approverB?: string;
  requestedDomains?: FiscalRealApprovalRecordDomain[];
  metadata?: any;
  forcePersistApprovalRecord?: boolean;
  forceSignApprovalRecord?: boolean;
  forceCompleteDualApproval?: boolean;
  forceGrantRealAuthorization?: boolean;
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

export interface FiscalRealApprovalRecordResult {
  success: boolean;
  status: FiscalRealApprovalRecordStatus | string;
  blueprintGenerated: boolean;
  schemaPlanGenerated: boolean;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  nonExecutableSignatureEnvelopeGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  approvalRecordBlueprintOnly: true;
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
  nonExecutableSignatureEnvelopeOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForApprovalRecordBlueprintClosure: true;
  approvedForNonExecutableSignatureEnvelope: true;
  approvedForRealApprovalRecordCreation: false;
  approvedForRealApprovalRecordPersistence: false;
  approvedForRealApprovalRecordSignature: false;
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

export interface FiscalRealApprovalRecordReport {
  generatedAt: string;
  status: FiscalRealApprovalRecordStatus | string;
  blueprint: any;
  schemaPlan: any;
  policy: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  nonExecutableSignatureEnvelope: any;
  recommendations: string[];
  readOnly: true;
  approvalRecordBlueprintOnly: true;
  nonExecutableSignatureEnvelopeOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForApprovalRecordBlueprintClosure: true;
  approvedForNonExecutableSignatureEnvelope: true;
  approvedForRealApprovalRecordCreation: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
