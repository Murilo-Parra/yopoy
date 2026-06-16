export enum FiscalDedicatedProvisioningStatus {
  PROVISIONING_DRY_RUN_READY = 'PROVISIONING_DRY_RUN_READY',
  CONTRACT_VALIDATION_READY = 'CONTRACT_VALIDATION_READY',
  BLOCKED_FOR_REAL_PROVISIONING = 'BLOCKED_FOR_REAL_PROVISIONING',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalDedicatedProvisioningDomain {
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalDedicatedProvisioningValidationInput {
  domain: FiscalDedicatedProvisioningDomain | string;
  requestedBy?: string;
  companyId?: string;
  proposedPlan?: any;
  metadata?: any;
  forceProvision?: boolean;
  forceCreateDatabase?: boolean;
  forceCreateVault?: boolean;
  forceLoadCertificate?: boolean;
  forceSefazCall?: boolean;
  forceXmlSigning?: boolean;
  forcePdfGeneration?: boolean;
}

export interface FiscalDedicatedProvisioningValidationResult {
  success: boolean;
  status: FiscalDedicatedProvisioningStatus | string;
  domain: FiscalDedicatedProvisioningDomain | string;
  validationPassed: boolean;
  blockers: string[];
  warnings: string[];
  infrastructureProvisioned: false;
  networkApplied: false;
  databaseProvisioned: false;
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
  provisioningPlanOnly: true;
  dryRunValidatorOnly: true;
  contractValidationOnly: true;
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

export interface FiscalDedicatedProvisioningReport {
  generatedAt: string;
  validations: any[];
  totals: any;
  blockedDomains: string[];
  blockers: string[];
  warnings: string[];
  readOnly: true;
  provisioningPlanOnly: true;
  dryRunValidatorOnly: true;
  contractValidationOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
