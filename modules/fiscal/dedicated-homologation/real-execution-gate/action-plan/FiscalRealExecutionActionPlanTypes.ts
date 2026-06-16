export enum FiscalRealActionPlanStatus {
  ACTION_PLAN_TEMPLATE_READY = 'ACTION_PLAN_TEMPLATE_READY',
  AUTHORIZATION_PAYLOAD_READY = 'AUTHORIZATION_PAYLOAD_READY',
  LOCKED_ACTION_PLAN_READY = 'LOCKED_ACTION_PLAN_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealActionPlanDomain {
  AUTHORIZATION_PAYLOAD = 'AUTHORIZATION_PAYLOAD',
  LOCKED_ACTION_PLAN = 'LOCKED_ACTION_PLAN',
  FORBIDDEN_COMMANDS = 'FORBIDDEN_COMMANDS',
  IAC_APPLY = 'IAC_APPLY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  PRODUCTION_V2 = 'PRODUCTION_V2'
}

export interface FiscalRealAuthorizationPayloadInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  authorizationPurpose?: string;
  metadata?: any;
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

export interface FiscalRealAuthorizationPayload {
  payloadId: string;
  generatedAt: string;
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  authorizationPurpose?: string;
  sanitizedMetadata: any;
  payloadExecutable: false;
  payloadSigned: false;
  payloadPersisted: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  realExecutionAuthorized: false;
  realExecutionGateUnlocked: false;
  realExecutionStarted: false;
  activationBlocked: true;
}

export interface FiscalRealLockedActionPlanItem {
  id: string;
  domain: string;
  label: string;
  commandType: string;
  realCommandGenerated: false;
  realCommandExecutable: false;
  executionAllowed: false;
  requiresNewExplicitModule: true;
  blockerReason: string;
}

export interface FiscalRealActionPlanResult {
  success: boolean;
  status: FiscalRealActionPlanStatus | string;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  authorizationPayloadBuilt: true;
  lockedActionPlanGenerated: true;
  payloadExecutable: false;
  payloadSigned: false;
  payloadPersisted: false;
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
  authorizationPayloadOnly: true;
  lockedActionPlanOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForActionPlanClosure: true;
  approvedForGateUnlock: false;
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

export interface FiscalRealActionPlanReport {
  generatedAt: string;
  status: FiscalRealActionPlanStatus | string;
  payloadTemplate: any;
  lockedActionPlan: any;
  forbiddenCommands: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  authorizationPayloadOnly: true;
  lockedActionPlanOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForActionPlanClosure: true;
  approvedForGateUnlock: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
