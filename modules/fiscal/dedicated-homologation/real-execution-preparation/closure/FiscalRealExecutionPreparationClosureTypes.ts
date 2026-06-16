export enum FiscalRealExecutionPreparationClosureStatus {
  EXECUTION_PREPARATION_CLOSURE_READY = 'EXECUTION_PREPARATION_CLOSURE_READY',
  TRANSITION_GATE_CLOSURE_READY = 'TRANSITION_GATE_CLOSURE_READY',
  PREPARATION_HANDOFF_READY = 'PREPARATION_HANDOFF_READY',
  BLOCKED_FOR_REAL_EXECUTION = 'BLOCKED_FOR_REAL_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealExecutionPreparationClosureDomain {
  OPERATIONAL_ENVELOPE = 'OPERATIONAL_ENVELOPE',
  COMMAND_MANIFEST = 'COMMAND_MANIFEST',
  PREFLIGHT_REVIEW = 'PREFLIGHT_REVIEW',
  EVIDENCE_PACKAGE = 'EVIDENCE_PACKAGE',
  HANDOFF = 'HANDOFF',
  FULL_PREPARATION_STACK = 'FULL_PREPARATION_STACK'
}

export interface FiscalRealExecutionPreparationClosureResult {
  success: boolean;
  status: FiscalRealExecutionPreparationClosureStatus | string;
  closureExecuted: boolean;
  handoffGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  preparationClosedDocumentally: true;
  transitionGateClosedDocumentally: true;
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
  transitionGateClosureOnly: true;
  preparationClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForPreparationClosure: true;
  approvedForTransitionGateClosure: true;
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

export interface FiscalRealExecutionPreparationClosureReport {
  generatedAt: string;
  status: FiscalRealExecutionPreparationClosureStatus | string;
  inventory: any;
  finalChecklist: any;
  evidencePackage: any;
  blockers: any;
  risks: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  transitionGateClosureOnly: true;
  preparationClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForPreparationClosure: true;
  approvedForTransitionGateClosure: true;
  approvedForRealExecutionAuthorization: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
