export enum FiscalDedicatedClosureStatus {
  DEDICATED_CLOSURE_READY = 'DEDICATED_CLOSURE_READY',
  ENGINEERING_REVIEW_READY = 'ENGINEERING_REVIEW_READY',
  BLOCKED_FOR_REAL_APPROVAL = 'BLOCKED_FOR_REAL_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalDedicatedClosureDomain {
  BLUEPRINT = 'BLUEPRINT',
  PROVISIONING_DRY_RUN = 'PROVISIONING_DRY_RUN',
  SIMULATION_HARNESS = 'SIMULATION_HARNESS',
  REPLAY_HARNESS = 'REPLAY_HARNESS',
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  VAULT = 'VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  RELEASE_GATE = 'RELEASE_GATE',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY'
}

export interface FiscalDedicatedEngineeringApprovalInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceApproveRealEnvironment?: boolean;
  forceApproveRealHomologation?: boolean;
  forceApproveSefaz?: boolean;
  forceApproveCertificate?: boolean;
  forceApproveXmlSigning?: boolean;
  forceApprovePdfGeneration?: boolean;
  forceApproveProductionV2?: boolean;
  metadata?: any;
}

export interface FiscalDedicatedEngineeringApprovalResult {
  success: boolean;
  status: FiscalDedicatedClosureStatus | string;
  approvalEvaluated: boolean;
  engineeringApproved: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  environmentActivated: false;
  infrastructureProvisioned: false;
  databaseProvisioned: false;
  realDatabaseConnected: false;
  vaultProvisioned: false;
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
  realTrafficCaptured: false;
  realTrafficProcessed: false;
  legacyHandlerCalled: false;
  v2HandlerCalled: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  engineeringApprovalOnly: true;
  transitionClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForEngineeringClosure: true;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalDedicatedClosureFinalReport {
  generatedAt: string;
  status: FiscalDedicatedClosureStatus | string;
  inventory: any;
  criteria: any;
  blockers: any;
  risks: any;
  evidencePackage: any;
  transitionChecklist: any;
  approval: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  engineeringApprovalOnly: true;
  transitionClosureOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForEngineeringClosure: true;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
