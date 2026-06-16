export enum FiscalHomologationReviewStatus {
  REVIEW_READY = 'REVIEW_READY',
  REVIEW_WITH_WARNINGS = 'REVIEW_WITH_WARNINGS',
  BLOCKED_FOR_REAL_HOMOLOGATION = 'BLOCKED_FOR_REAL_HOMOLOGATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalHomologationReviewDomain {
  MOCK_EXECUTION = 'MOCK_EXECUTION',
  MOCK_SEFAZ = 'MOCK_SEFAZ',
  MOCK_CERTIFICATE = 'MOCK_CERTIFICATE',
  MOCK_XML = 'MOCK_XML',
  MOCK_DANFE = 'MOCK_DANFE',
  SAFE_SHAPE_VALIDATION = 'SAFE_SHAPE_VALIDATION',
  SCENARIO_CATALOG = 'SCENARIO_CATALOG',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  RELEASE_GATE = 'RELEASE_GATE',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalHomologationReviewMetrics {
  generatedAt: string;
  totalMockScenarios: number;
  totalMockExecutions: number;
  validationFailures: number;
  blockedSensitivePayloads: number;
  unknownScenariosBlocked: number;
  forceRealExecutionBlocked: number;
  mockSefazResponses: number;
  mockCertificateResponses: number;
  mockXmlResponses: number;
  mockDanfeResponses: number;
  realHomologationExecutions: 0;
  realSefazCalls: 0;
  realCertificatesLoaded: 0;
  realPfxReads: 0;
  realCertificatePasswordReads: 0;
  realXmlSigned: 0;
  realPdfGenerated: 0;
  realTrafficChanges: 0;
  realDmlExecutions: 0;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalHomologationMaturityScore {
  score: number;
  level: string;
  reasons: string[];
  blockers: string[];
  approvedForHomologationExecution: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalHomologationFinalReview {
  generatedAt: string;
  status: FiscalHomologationReviewStatus | string;
  metrics: FiscalHomologationReviewMetrics;
  score: FiscalHomologationMaturityScore;
  risks: any[];
  recommendations: string[];
  go: false;
  noGo: true;
  homologationExecuted: false;
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
  readOnly: true;
  reviewOnly: true;
  mockOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForHomologationExecution: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}
