export enum FiscalHomologationBlueprintStatus {
  BLUEPRINT_READY = 'BLUEPRINT_READY',
  RUNBOOK_READY = 'RUNBOOK_READY',
  HOMOLOGATION_BLOCKED = 'HOMOLOGATION_BLOCKED',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalHomologationDomain {
  ENVIRONMENT_INVENTORY = 'ENVIRONMENT_INVENTORY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  CERTIFICATE_PLAN = 'CERTIFICATE_PLAN',
  XML_SIGNING_PLAN = 'XML_SIGNING_PLAN',
  DANFE_PDF_PLAN = 'DANFE_PDF_PLAN',
  RUNBOOK = 'RUNBOOK',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  RELEASE_GATE = 'RELEASE_GATE',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS'
}

export interface FiscalHomologationEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceExecute?: boolean;
  metadata?: any;
}

export interface FiscalHomologationEvaluationResult {
  success: boolean;
  status: FiscalHomologationBlueprintStatus | string;
  homologationExecuted: false;
  sefazCalled: false;
  xmlSigned: false;
  pdfGenerated: false;
  certificateLoaded: false;
  releaseActivated: false;
  canaryActivated: false;
  productionV2Activated: false;
  trafficChanged: false;
  blockers: string[];
  warnings: string[];
  readOnly: true;
  blueprintOnly: true;
  runbookPlanningOnly: true;
  governanceOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForHomologationExecution: false;
  approvedForSefazConnection: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalHomologationFinalReport {
  generatedAt: string;
  status: FiscalHomologationBlueprintStatus | string;
  environmentInventory: any[];
  isolationPlan: any;
  certificatePlan: any;
  xmlPlan: any;
  danfePlan: any;
  runbook: any;
  risks: any[];
  evaluation: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  blueprintOnly: true;
  runbookPlanningOnly: true;
  governanceOnly: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForHomologationExecution: false;
  approvedForSefazConnection: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
