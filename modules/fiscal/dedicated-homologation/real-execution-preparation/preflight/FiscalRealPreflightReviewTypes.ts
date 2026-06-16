export enum FiscalRealPreflightStatus {
  PREFLIGHT_REVIEW_READY = 'PREFLIGHT_REVIEW_READY',
  READINESS_EVIDENCE_READY = 'READINESS_EVIDENCE_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealPreflightDomain {
  READINESS_EVIDENCE = 'READINESS_EVIDENCE',
  PREFLIGHT_REVIEW = 'PREFLIGHT_REVIEW',
  COMMAND_MANIFEST = 'COMMAND_MANIFEST',
  EXECUTION_PREPARATION = 'EXECUTION_PREPARATION',
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

export interface FiscalRealPreflightInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  reviewPurpose?: string;
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

export interface FiscalRealPreflightResult {
  success: boolean;
  status: FiscalRealPreflightStatus | string;
  evaluationExecuted: boolean;
  preflightReviewed: boolean;
  evidencePackageGenerated: boolean;
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
  readinessEvidenceOnly: true;
  preflightReviewOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForPreflightClosure: true;
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

export interface FiscalRealPreflightReport {
  generatedAt: string;
  status: FiscalRealPreflightStatus | string;
  evidenceInventory: any;
  checklist: any;
  evidencePackage: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  readinessEvidenceOnly: true;
  preflightReviewOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForPreflightClosure: true;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
