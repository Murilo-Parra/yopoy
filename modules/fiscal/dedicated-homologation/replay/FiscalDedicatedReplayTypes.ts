export enum FiscalDedicatedReplayStatus {
  REPLAY_HARNESS_READY = 'REPLAY_HARNESS_READY',
  SYNTHETIC_REPLAY_READY = 'SYNTHETIC_REPLAY_READY',
  BLOCKED_FOR_REAL_REPLAY = 'BLOCKED_FOR_REAL_REPLAY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalDedicatedReplayDomain {
  NFE = 'NFE',
  NFCE = 'NFCE',
  NFSE = 'NFSE',
  DANFE = 'DANFE',
  SEFAZ_PROTOCOL = 'SEFAZ_PROTOCOL',
  CERTIFICATE = 'CERTIFICATE',
  XML_SIGNER = 'XML_SIGNER',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalDedicatedReplayInput {
  domain?: FiscalDedicatedReplayDomain | string;
  scenarioId?: string;
  requestedBy?: string;
  companyId?: string;
  syntheticOnly?: boolean;
  safeShape?: any;
  metadata?: any;
  forceRealTraffic?: boolean;
  forceEndpointCall?: boolean;
  forceLegacyHandlerCall?: boolean;
  forceV2HandlerCall?: boolean;
  forceSefazCall?: boolean;
  forceCertificateLoad?: boolean;
  forceXmlSigning?: boolean;
  forcePdfGeneration?: boolean;
  forceWorkerCreation?: boolean;
}

export interface FiscalDedicatedReplayResult {
  success: boolean;
  status: FiscalDedicatedReplayStatus | string;
  domain: FiscalDedicatedReplayDomain | string;
  replayExecuted: boolean;
  queued: boolean;
  processedManually: boolean;
  blockers: string[];
  warnings: string[];
  syntheticOnly: true;
  realTrafficCaptured: false;
  realTrafficProcessed: false;
  endpointCalled: false;
  legacyHandlerCalled: false;
  v2HandlerCalled: false;
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
  replayHarnessOnly: true;
  syntheticReplayOnly: true;
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

export interface FiscalDedicatedReplayReport {
  generatedAt: string;
  queueSummary: any;
  results: any[];
  totals: any;
  blockedDomains: string[];
  blockers: string[];
  warnings: string[];
  readOnly: true;
  replayHarnessOnly: true;
  syntheticReplayOnly: true;
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
