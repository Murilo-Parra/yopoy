export enum FiscalRealExecutionGateStatus {
  EXECUTION_GATE_LOCKED = 'EXECUTION_GATE_LOCKED',
  PRE_EXECUTION_EVALUATION_READY = 'PRE_EXECUTION_EVALUATION_READY',
  BLOCKED_FOR_GATE_UNLOCK = 'BLOCKED_FOR_GATE_UNLOCK',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRealExecutionGateInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  metadata?: any;
  forceUnlockGate?: boolean;
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

export interface FiscalRealExecutionGateResult {
  success: boolean;
  status: FiscalRealExecutionGateStatus | string;
  evaluationExecuted: boolean;
  unlockSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  realExecutionGateCreated: true;
  realExecutionGateUnlocked: false;
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
  executionGateOnly: true;
  preExecutionLockOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForExecutionGateClosure: true;
  approvedForGateUnlock: false;
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

export interface FiscalRealExecutionGateReport {
  generatedAt: string;
  status: FiscalRealExecutionGateStatus | string;
  preLockChecklist: any;
  authorizationState: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  realExecutionGateCreated: true;
  realExecutionGateUnlocked: false;
  readOnly: true;
  executionGateOnly: true;
  preExecutionLockOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForExecutionGateClosure: true;
  approvedForGateUnlock: false;
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
