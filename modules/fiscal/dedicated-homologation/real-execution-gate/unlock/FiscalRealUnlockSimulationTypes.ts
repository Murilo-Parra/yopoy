export enum FiscalRealUnlockStatus {
  UNLOCK_SIMULATION_READY = 'UNLOCK_SIMULATION_READY',
  DUAL_APPROVAL_REQUIRED = 'DUAL_APPROVAL_REQUIRED',
  BLOCKED_FOR_REAL_UNLOCK = 'BLOCKED_FOR_REAL_UNLOCK',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealUnlockDomain {
  GATE_UNLOCK = 'GATE_UNLOCK',
  DUAL_APPROVAL = 'DUAL_APPROVAL',
  EXECUTION_AUTHORIZATION = 'EXECUTION_AUTHORIZATION',
  CHANGE_WINDOW = 'CHANGE_WINDOW',
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

export interface FiscalRealUnlockInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  primaryApproverRole?: string;
  secondaryApproverRole?: string;
  metadata?: any;
  forceUnlockGate?: boolean;
  forceBypassDualApproval?: boolean;
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

export interface FiscalRealUnlockResult {
  success: boolean;
  status: FiscalRealUnlockStatus | string;
  evaluationExecuted: boolean;
  dualApprovalSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  realExecutionGateUnlocked: false;
  primaryApprovalSimulated: true;
  secondaryApprovalSimulated: true;
  dualApprovalSatisfiedForSimulation: true;
  dualApprovalSatisfiedForRealUnlock: false;
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
  unlockSimulationOnly: true;
  dualApprovalGateOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForUnlockSimulationClosure: true;
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

export interface FiscalRealUnlockReport {
  generatedAt: string;
  status: FiscalRealUnlockStatus | string;
  eligibilityChecklist: any;
  dualApprovalMatrix: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  unlockSimulationOnly: true;
  dualApprovalGateOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForUnlockSimulationClosure: true;
  approvedForGateUnlock: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
