export enum FiscalRealExecutionGateClosureStatus {
  EXECUTION_GATE_CLOSURE_READY = 'EXECUTION_GATE_CLOSURE_READY',
  READINESS_HANDOFF_READY = 'READINESS_HANDOFF_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealExecutionGateClosureDomain {
  PRE_EXECUTION_LOCK = 'PRE_EXECUTION_LOCK',
  UNLOCK_SIMULATION = 'UNLOCK_SIMULATION',
  ACTION_PLAN = 'ACTION_PLAN',
  EVIDENCE_PACKAGE = 'EVIDENCE_PACKAGE',
  HANDOFF = 'HANDOFF',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalRealExecutionGateClosureResult {
  success: boolean;
  status: FiscalRealExecutionGateClosureStatus | string;
  closureExecuted: boolean;
  handoffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  realExecutionGateClosedDocumentally: true;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  realExecutionStarted: false;
  payloadExecutable: false;
  payloadSigned: false;
  payloadPersisted: false;
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
  executionGateClosureOnly: true;
  readinessHandoffOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForExecutionGateClosure: true;
  approvedForReadinessHandoff: true;
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

export interface FiscalRealExecutionGateClosureReport {
  generatedAt: string;
  status: FiscalRealExecutionGateClosureStatus | string;
  inventory: any;
  finalChecklist: any;
  evidencePackage: any;
  blockers: any;
  risks: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  executionGateClosureOnly: true;
  readinessHandoffOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForExecutionGateClosure: true;
  approvedForReadinessHandoff: true;
  approvedForGateUnlock: false;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
