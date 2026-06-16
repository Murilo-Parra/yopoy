export enum FiscalDedicatedSimulationStatus {
  SIMULATION_HARNESS_READY = 'SIMULATION_HARNESS_READY',
  MOCK_ENVIRONMENT_READY = 'MOCK_ENVIRONMENT_READY',
  BLOCKED_FOR_REAL_ENVIRONMENT = 'BLOCKED_FOR_REAL_ENVIRONMENT',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalDedicatedSimulationDomain {
  RUNTIME = 'RUNTIME',
  DATABASE = 'DATABASE',
  VAULT = 'VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalDedicatedSimulationInput {
  domain?: FiscalDedicatedSimulationDomain | string;
  requestedBy?: string;
  companyId?: string;
  scenarioId?: string;
  syntheticOnly?: boolean;
  metadata?: any;
  forceRealRuntime?: boolean;
  forceRealDatabase?: boolean;
  forceRealVault?: boolean;
  forceRealCertificate?: boolean;
  forceSefazCall?: boolean;
  forceXmlSigning?: boolean;
  forcePdfGeneration?: boolean;
  forceWorkerCreation?: boolean;
}

export interface FiscalDedicatedSimulationResult {
  success: boolean;
  status: FiscalDedicatedSimulationStatus | string;
  domain: FiscalDedicatedSimulationDomain | string;
  simulationExecuted: boolean;
  blockers: string[];
  warnings: string[];
  environmentActivated: false;
  infrastructureProvisioned: false;
  networkApplied: false;
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
  observabilityActivated: false;
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
  simulationHarnessOnly: true;
  mockEnvironmentOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalDedicatedSimulationReport {
  generatedAt: string;
  results: any[];
  totals: any;
  blockedDomains: string[];
  blockers: string[];
  warnings: string[];
  readOnly: true;
  simulationHarnessOnly: true;
  mockEnvironmentOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
