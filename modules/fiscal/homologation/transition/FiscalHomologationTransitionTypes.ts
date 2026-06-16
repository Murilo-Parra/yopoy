export enum FiscalHomologationTransitionStatus {
  TRANSITION_PLANNED_ONLY = 'TRANSITION_PLANNED_ONLY',
  MOCK_PHASE_OUT_PLANNED = 'MOCK_PHASE_OUT_PLANNED',
  DEDICATED_ENVIRONMENT_REQUIRED = 'DEDICATED_ENVIRONMENT_REQUIRED',
  BLOCKED_FOR_REAL_HOMOLOGATION = 'BLOCKED_FOR_REAL_HOMOLOGATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalHomologationTransitionDomain {
  MOCK_PHASE_OUT = 'MOCK_PHASE_OUT',
  DEDICATED_ENVIRONMENT = 'DEDICATED_ENVIRONMENT',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  CERTIFICATE_VAULT = 'CERTIFICATE_VAULT',
  XML_SIGNING_ENVIRONMENT = 'XML_SIGNING_ENVIRONMENT',
  DANFE_PDF_ENVIRONMENT = 'DANFE_PDF_ENVIRONMENT',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  RELEASE_GATE = 'RELEASE_GATE',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalHomologationTransitionEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceTransition?: boolean;
  forceRealHomologation?: boolean;
  metadata?: any;
}

export interface FiscalHomologationTransitionEvaluationResult {
  success: boolean;
  status: FiscalHomologationTransitionStatus | string;
  transitionExecuted: false;
  mockPhaseOutExecuted: false;
  dedicatedEnvironmentActivated: false;
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
  transitionPlanningOnly: true;
  phaseOutPlanningOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForTransitionExecution: false;
  approvedForMockPhaseOut: false;
  approvedForDedicatedEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalHomologationTransitionFinalReport {
  generatedAt: string;
  status: FiscalHomologationTransitionStatus | string;
  inventory: any[];
  mockPhaseOutPlan: any;
  dedicatedEnvironmentPlan: any;
  criteria: any[];
  blockers: any[];
  evaluation: FiscalHomologationTransitionEvaluationResult;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  transitionPlanningOnly: true;
  phaseOutPlanningOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForTransitionExecution: false;
  approvedForMockPhaseOut: false;
  approvedForDedicatedEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
