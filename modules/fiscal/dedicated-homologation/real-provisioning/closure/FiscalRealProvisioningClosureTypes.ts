export enum FiscalRealProvisioningClosureStatus {
  REAL_PROVISIONING_CLOSURE_READY = 'REAL_PROVISIONING_CLOSURE_READY',
  AUTHORIZATION_WRAPPER_READY = 'AUTHORIZATION_WRAPPER_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealProvisioningClosureDomain {
  BLUEPRINT = 'BLUEPRINT',
  IAC_PLAN = 'IAC_PLAN',
  SECURITY_REVIEW = 'SECURITY_REVIEW',
  CHANGE_WINDOW = 'CHANGE_WINDOW',
  AUTHORIZATION_WRAPPER = 'AUTHORIZATION_WRAPPER',
  EVIDENCE_PACKAGE = 'EVIDENCE_PACKAGE',
  HANDOFF = 'HANDOFF',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalRealProvisioningAuthorizationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  authorizationStage?: string;
  reviewerRole?: string;
  metadata?: any;
  forceAuthorizeRealExecution?: boolean;
  forceOpenRealChangeWindow?: boolean;
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

export interface FiscalRealProvisioningClosureResult {
  success: boolean;
  status: FiscalRealProvisioningClosureStatus | string;
  closureExecuted: boolean;
  authorizationSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  realExecutionAuthorized: false;
  realChangeWindowOpened: false;
  realExecutionStarted: false;
  iacApplyApproved: false;
  iacApplied: false;
  terraformApplied: false;
  pulumiApplied: false;
  cloudFormationDeployed: false;
  realResourceCreated: false;
  infrastructureProvisioned: false;
  environmentActivated: false;
  networkApplied: false;
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
  rollbackInstalled: false;
  killSwitchInstalled: false;
  circuitBreakerInstalled: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  dryRunClosureOnly: true;
  authorizationWrapperOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRealProvisioningClosure: true;
  approvedForRealExecutionAuthorization: false;
  approvedForRealChangeWindow: false;
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

export interface FiscalRealProvisioningClosureReport {
  generatedAt: string;
  status: FiscalRealProvisioningClosureStatus | string;
  inventory: any;
  finalChecklist: any;
  evidencePackage: any;
  authorizationWrapper: any;
  blockers: any;
  risks: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  dryRunClosureOnly: true;
  authorizationWrapperOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealProvisioningClosure: true;
  approvedForRealExecutionAuthorization: false;
  approvedForRealChangeWindow: false;
  approvedForExecutionStart: false;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
