export enum FiscalDedicatedHomologationStatus {
  BLUEPRINT_READY = 'BLUEPRINT_READY',
  CONTRACTS_READY = 'CONTRACTS_READY',
  BLOCKED_FOR_REAL_ACTIVATION = 'BLOCKED_FOR_REAL_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalDedicatedHomologationDomain {
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ_CONNECTOR = 'SEFAZ_CONNECTOR',
  XML_SIGNER = 'XML_SIGNER',
  DANFE_RENDERER = 'DANFE_RENDERER',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  KILL_SWITCH = 'KILL_SWITCH',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY'
}

export interface FiscalDedicatedEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceActivateEnvironment?: boolean;
  forceRealHomologation?: boolean;
  forceSefazConnection?: boolean;
  metadata?: any;
}

export interface FiscalDedicatedEvaluationResult {
  success: boolean;
  status: FiscalDedicatedHomologationStatus | string;
  environmentActivated: false;
  realHomologationActivated: false;
  realSefazCalled: false;
  certificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  realXmlSigned: false;
  pdfGenerated: false;
  realPdfGenerated: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  endpointsCalled: false;
  workersCreated: false;
  schedulersCreated: false;
  blockers: string[];
  warnings: string[];
  readOnly: true;
  infrastructureBlueprintOnly: true;
  contractOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalDedicatedFinalReport {
  generatedAt: string;
  status: FiscalDedicatedHomologationStatus | string;
  inventory: any[];
  contracts: any;
  criteria: any[];
  blockers: any[];
  evaluation: FiscalDedicatedEvaluationResult;
  recommendations: string[];
  readOnly: true;
  infrastructureBlueprintOnly: true;
  contractOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
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
