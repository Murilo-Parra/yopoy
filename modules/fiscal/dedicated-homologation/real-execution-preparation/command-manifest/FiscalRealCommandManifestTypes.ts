export enum FiscalRealCommandManifestStatus {
  COMMAND_MANIFEST_READY = 'COMMAND_MANIFEST_READY',
  DRY_RUN_MANIFEST_READY = 'DRY_RUN_MANIFEST_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealCommandManifestDomain {
  COMMAND_MANIFEST = 'COMMAND_MANIFEST',
  IAC_COMMANDS = 'IAC_COMMANDS',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  PRODUCTION_V2 = 'PRODUCTION_V2'
}

export interface FiscalRealCommandManifestInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  manifestPurpose?: string;
  metadata?: any;
  proposedCommands?: any[];
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

export interface FiscalRealCommandManifestItem {
  id: string;
  domain: FiscalRealCommandManifestDomain | string;
  label: string;
  commandIntent: string;
  commandPreview: string;
  realCommandIncluded: false;
  executableCommandIncluded: false;
  shellCommandIncluded: false;
  containsSecret: false;
  containsPayload: false;
  executionAllowed: false;
  requiresNewExplicitModule: true;
  blockerReason: string;
}

export interface FiscalRealCommandManifestResult {
  success: boolean;
  status: FiscalRealCommandManifestStatus | string;
  evaluationExecuted: boolean;
  manifestGenerated: boolean;
  decisionSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  realCommandIncluded: false;
  executableCommandIncluded: false;
  shellCommandIncluded: false;
  manifestExecutable: false;
  manifestSigned: false;
  manifestPersisted: false;
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
  commandManifestOnly: true;
  dryRunManifestOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForCommandManifestClosure: true;
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

export interface FiscalRealCommandManifestReport {
  generatedAt: string;
  status: FiscalRealCommandManifestStatus | string;
  catalog: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  commandManifestOnly: true;
  dryRunManifestOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForCommandManifestClosure: true;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
