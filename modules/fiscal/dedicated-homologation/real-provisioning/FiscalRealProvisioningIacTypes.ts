export enum FiscalRealProvisioningIacStatus {
  IAC_PLAN_READY = 'IAC_PLAN_READY',
  SECRET_VAULT_DRY_RUN_READY = 'SECRET_VAULT_DRY_RUN_READY',
  BLOCKED_FOR_REAL_APPLY = 'BLOCKED_FOR_REAL_APPLY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealProvisioningIacDomain {
  IAC_RESOURCE = 'IAC_RESOURCE',
  STATE_BACKEND = 'STATE_BACKEND',
  VARIABLES = 'VARIABLES',
  SECRET_VAULT = 'SECRET_VAULT',
  SECRET = 'SECRET',
  CERTIFICATE_SECRET = 'CERTIFICATE_SECRET',
  ACCESS_POLICY = 'ACCESS_POLICY',
  ROTATION_POLICY = 'ROTATION_POLICY',
  AUDIT_POLICY = 'AUDIT_POLICY',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalRealProvisioningIacEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  proposedPlan?: any;
  metadata?: any;
  forceTerraformApply?: boolean;
  forcePulumiUp?: boolean;
  forceCloudDeploy?: boolean;
  forceCreateRealResource?: boolean;
  forceCreateRealDatabase?: boolean;
  forceCreateRealVault?: boolean;
  forceWriteRealSecret?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceCallRealSefaz?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalRealProvisioningIacEvaluationResult {
  success: boolean;
  status: FiscalRealProvisioningIacStatus | string;
  evaluationExecuted: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  iacApplied: false;
  terraformApplied: false;
  pulumiApplied: false;
  cloudFormationDeployed: false;
  realResourceCreated: false;
  infrastructureProvisioned: false;
  environmentActivated: false;
  networkApplied: false;
  databaseProvisioned: false;
  realDatabaseConnected: false;
  vaultProvisioned: false;
  secretWritten: false;
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
  iacPlanOnly: true;
  secretVaultDryRunOnly: true;
  infrastructureContractOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForIacPlanClosure: true;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForRealHomologation: false;
  approvedForSefazConnection: false;
  approvedForCertificateLoad: false;
  approvedForXmlSigning: false;
  approvedForPdfGeneration: false;
  approvedForProductionV2: false;
}

export interface FiscalRealProvisioningIacFinalReport {
  generatedAt: string;
  status: FiscalRealProvisioningIacStatus | string;
  resources: any;
  stateBackend: any;
  variables: any;
  vaultContract: any;
  validations: any;
  evaluation: any;
  recommendations: string[];
  readOnly: true;
  iacPlanOnly: true;
  secretVaultDryRunOnly: true;
  infrastructureContractOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForIacPlanClosure: true;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
