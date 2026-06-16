export enum FiscalRealProvisioningBlueprintStatus {
  REAL_BLUEPRINT_READY = 'REAL_BLUEPRINT_READY',
  REAL_INFRASTRUCTURE_PLAN_READY = 'REAL_INFRASTRUCTURE_PLAN_READY',
  BLOCKED_FOR_REAL_PROVISIONING = 'BLOCKED_FOR_REAL_PROVISIONING',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealProvisioningDomain {
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  RESPONSIBILITY = 'RESPONSIBILITY',
  APPROVAL = 'APPROVAL',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalRealProvisioningEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  forceProvisionRealInfrastructure?: boolean;
  forceCreateRealDatabase?: boolean;
  forceCreateRealVault?: boolean;
  forceLoadRealCertificate?: boolean;
  forceCallRealSefaz?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceActivateProductionV2?: boolean;
  metadata?: any;
}

export interface FiscalRealProvisioningEvaluationResult {
  success: boolean;
  status: FiscalRealProvisioningBlueprintStatus | string;
  evaluationExecuted: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  infrastructureProvisioned: false;
  environmentActivated: false;
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
  realProvisioningBlueprintOnly: true;
  infrastructureDesignOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForBlueprintClosure: true;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalRealProvisioningFinalReport {
  generatedAt: string;
  status: FiscalRealProvisioningBlueprintStatus | string;
  inventory: any;
  blueprints: any;
  responsibilities: any;
  criteria: any;
  blockers: any;
  evaluation: any;
  recommendations: string[];
  readOnly: true;
  realProvisioningBlueprintOnly: true;
  infrastructureDesignOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForBlueprintClosure: true;
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
