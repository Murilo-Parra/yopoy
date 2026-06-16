export enum FiscalHomologationClosureStatus {
  CLOSED_AS_MOCK_ONLY = 'CLOSED_AS_MOCK_ONLY',
  CLOSED_WITH_WARNINGS = 'CLOSED_WITH_WARNINGS',
  BLOCKED_FOR_REAL_HOMOLOGATION = 'BLOCKED_FOR_REAL_HOMOLOGATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalHomologationClosureDomain {
  BLUEPRINT = 'BLUEPRINT',
  MOCK_EXECUTION = 'MOCK_EXECUTION',
  MOCK_REVIEW = 'MOCK_REVIEW',
  MOCK_METRICS = 'MOCK_METRICS',
  SAFE_SHAPE_VALIDATION = 'SAFE_SHAPE_VALIDATION',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  CERTIFICATE_ISOLATION = 'CERTIFICATE_ISOLATION',
  XML_SIGNING_ISOLATION = 'XML_SIGNING_ISOLATION',
  PDF_ISOLATION = 'PDF_ISOLATION',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  RELEASE_GATE = 'RELEASE_GATE',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalHomologationClosureInventoryItem {
  domain: FiscalHomologationClosureDomain | string;
  implemented: boolean;
  hasRoutes: boolean;
  hasRuntimeSideEffects: false;
  readOnly: boolean;
  closureOnly: boolean;
  mockOnly: boolean;
  governanceOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  homologationExecuted: false;
  realSefazCalled: false;
  certificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  pdfGenerated: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  workerCreated: false;
  schedulerCreated: false;
  routeToV2: false;
  routeToLegacy: true;
  notes: string;
}

export interface FiscalHomologationClosureCriterion {
  id: string;
  name: string;
  passed: boolean;
  severity: string;
  evidence: string;
  blockerForRealHomologation: boolean;
}

export interface FiscalHomologationEvidencePackage {
  generatedAt: string;
  blueprintPresent: boolean;
  mockHarnessPresent: boolean;
  reviewPresent: boolean;
  metricsPresent: boolean;
  realHomologationExecutions: 0;
  realSefazCalls: 0;
  realCertificatesLoaded: 0;
  realPfxReads: 0;
  realCertificatePasswordReads: 0;
  realXmlSigned: 0;
  realPdfGenerated: 0;
  realTrafficChanges: 0;
  realDmlExecutions: 0;
  homologationExecuted: false;
  realSefazCalled: false;
  certificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  pdfGenerated: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  endpointsCalled: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  closureOnly: true;
  mockOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalHomologationClosureFinalReport {
  generatedAt: string;
  status: FiscalHomologationClosureStatus | string;
  inventory: FiscalHomologationClosureInventoryItem[];
  criteria: FiscalHomologationClosureCriterion[];
  evidencePackage: FiscalHomologationEvidencePackage;
  risks: any[];
  handoff: any;
  recommendations: string[];
  readOnly: true;
  closureOnly: true;
  mockOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
