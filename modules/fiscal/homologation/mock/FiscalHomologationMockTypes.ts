export enum FiscalHomologationMockStatus {
  MOCK_READY = 'MOCK_READY',
  MOCK_VALIDATION_READY = 'MOCK_VALIDATION_READY',
  MOCK_EXECUTION_SIMULATED = 'MOCK_EXECUTION_SIMULATED',
  MOCK_BLOCKED_BY_POLICY = 'MOCK_BLOCKED_BY_POLICY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalHomologationMockScenario {
  MOCK_NFE_AUTHORIZATION = 'MOCK_NFE_AUTHORIZATION',
  MOCK_NFCE_AUTHORIZATION = 'MOCK_NFCE_AUTHORIZATION',
  MOCK_CANCEL = 'MOCK_CANCEL',
  MOCK_INUTILIZATION = 'MOCK_INUTILIZATION',
  MOCK_CONTINGENCY = 'MOCK_CONTINGENCY',
  MOCK_CCE = 'MOCK_CCE',
  MOCK_DANFE_PREVIEW = 'MOCK_DANFE_PREVIEW'
}

export interface FiscalHomologationMockExecutionInput {
  scenario: FiscalHomologationMockScenario | string;
  companyId?: string;
  requestedBy?: string;
  safeShape: any;
  metadata?: any;
  forceRealExecution?: boolean;
}

export interface FiscalHomologationMockExecutionResult {
  success: boolean;
  status: FiscalHomologationMockStatus | string;
  scenario: string;
  validationPassed: boolean;
  mockSefazResponse: any;
  mockCertificateResult: any;
  mockXmlResult: any;
  mockDanfeResult: any;
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
  mockOnly: true;
  sandboxOnly: true;
  dryRunOnly: true;
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
  blockers: string[];
  warnings: string[];
}

export interface FiscalHomologationMockReport {
  generatedAt: string;
  scenarios: any[];
  lastExecutions: any[];
  totals: any;
  readOnly: true;
  mockOnly: true;
  sandboxOnly: true;
  dryRunOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForHomologationExecution: false;
  approvedForProductionV2: false;
}
