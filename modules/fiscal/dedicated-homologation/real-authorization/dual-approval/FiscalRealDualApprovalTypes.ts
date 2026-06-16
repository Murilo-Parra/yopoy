export enum FiscalRealDualApprovalStatus {
  DUAL_APPROVAL_SIMULATION_READY = 'DUAL_APPROVAL_SIMULATION_READY',
  SOD_REVIEW_READY = 'SOD_REVIEW_READY',
  BLOCKED_FOR_REAL_APPROVAL = 'BLOCKED_FOR_REAL_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealDualApprovalDomain {
  DUAL_APPROVAL = 'DUAL_APPROVAL',
  SEGREGATION_OF_DUTIES = 'SEGREGATION_OF_DUTIES',
  APPROVER_A = 'APPROVER_A',
  APPROVER_B = 'APPROVER_B',
  REQUESTER = 'REQUESTER',
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

export interface FiscalRealDualApprovalInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  requestId?: string;
  approverA?: string;
  approverB?: string;
  requesterRole?: string;
  approverARole?: string;
  approverBRole?: string;
  justification?: string;
  requestedDomains?: FiscalRealDualApprovalDomain[];
  metadata?: any;
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

export interface FiscalRealDualApprovalResult {
  success: boolean;
  status: FiscalRealDualApprovalStatus | string;
  validationExecuted: boolean;
  simulationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  sodReviewed: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  dualApprovalSimulated: true;
  dualApprovalCompleted: false;
  realApprovalGranted: false;
  realAuthorizationGranted: false;
  approvalRecordPersisted: false;
  approverANotifiedExternally: false;
  approverBNotifiedExternally: false;
  sameUserApprovalBlocked: true;
  segregationOfDutiesPassed: boolean;
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
  dualApprovalSimulationOnly: true;
  segregationOfDutiesReviewOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForDualApprovalSimulationClosure: true;
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

export interface FiscalRealDualApprovalReport {
  generatedAt: string;
  status: FiscalRealDualApprovalStatus | string;
  matrix: any;
  sodReview: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  dualApprovalSimulationOnly: true;
  segregationOfDutiesReviewOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForDualApprovalSimulationClosure: true;
  approvedForRealDualApprovalCompletion: false;
  approvedForRealAuthorizationGrant: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
