export enum FiscalRealChangeWindowStatus {
  CHANGE_WINDOW_PLAN_READY = 'CHANGE_WINDOW_PLAN_READY',
  EXECUTION_READINESS_READY = 'EXECUTION_READINESS_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealChangeWindowDomain {
  CHANGE_WINDOW = 'CHANGE_WINDOW',
  PRE_EXECUTION = 'PRE_EXECUTION',
  FREEZE_UNFREEZE = 'FREEZE_UNFREEZE',
  COMMUNICATION = 'COMMUNICATION',
  ROLLBACK = 'ROLLBACK',
  READINESS = 'READINESS',
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

export interface FiscalRealChangeWindowInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  proposedWindow?: any;
  reviewerRole?: string;
  metadata?: any;
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

export interface FiscalRealChangeWindowResult {
  success: boolean;
  status: FiscalRealChangeWindowStatus | string;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
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
  changeWindowPlanningOnly: true;
  executionReadinessOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForChangeWindowClosure: true;
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

export interface FiscalRealChangeWindowReport {
  generatedAt: string;
  status: FiscalRealChangeWindowStatus | string;
  calendar: any;
  preExecutionChecklist: any;
  freezeUnfreeze: any;
  communicationPlan: any;
  rollbackPlan: any;
  readinessMatrix: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  changeWindowPlanningOnly: true;
  executionReadinessOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForChangeWindowClosure: true;
  approvedForRealChangeWindow: false;
  approvedForExecutionStart: false;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
