export enum FiscalRealProvisioningSecurityStatus {
  SECURITY_REVIEW_READY = 'SECURITY_REVIEW_READY',
  APPROVAL_WORKFLOW_READY = 'APPROVAL_WORKFLOW_READY',
  BLOCKED_FOR_REAL_APPROVAL = 'BLOCKED_FOR_REAL_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalRealProvisioningSecurityDomain {
  IAC_APPLY = 'IAC_APPLY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  DATABASE = 'DATABASE',
  SECRET_VAULT = 'SECRET_VAULT',
  CERTIFICATE = 'CERTIFICATE',
  SEFAZ = 'SEFAZ',
  XML_SIGNER = 'XML_SIGNER',
  DANFE = 'DANFE',
  OBSERVABILITY = 'OBSERVABILITY',
  ROLLBACK = 'ROLLBACK',
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  SEGREGATION_OF_DUTIES = 'SEGREGATION_OF_DUTIES',
  FULL_STACK = 'FULL_STACK'
}

export interface FiscalRealProvisioningSecurityInput {
  requestedBy?: string;
  companyId?: string;
  requestedAction?: string;
  reviewerRole?: string;
  approvalStage?: string;
  metadata?: any;
  forceApproveIacApply?: boolean;
  forceApproveInfrastructureProvisioning?: boolean;
  forceApproveRealDatabase?: boolean;
  forceApproveRealVault?: boolean;
  forceApproveSecretWrite?: boolean;
  forceApproveCertificateLoad?: boolean;
  forceApproveRealSefaz?: boolean;
  forceApproveXmlSigning?: boolean;
  forceApprovePdfGeneration?: boolean;
  forceApproveProductionV2?: boolean;
}

export interface FiscalRealProvisioningSecurityResult {
  success: boolean;
  status: FiscalRealProvisioningSecurityStatus | string;
  evaluationExecuted: boolean;
  approvalSimulated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  iacApplyApproved: false;
  infrastructureProvisioningApproved: false;
  realEnvironmentApproved: false;
  realDatabaseApproved: false;
  realVaultApproved: false;
  realSecretWriteApproved: false;
  realCertificateLoadApproved: false;
  realSefazApproved: false;
  realXmlSigningApproved: false;
  realPdfGenerationApproved: false;
  productionV2Approved: false;
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
  securityReviewOnly: true;
  approvalWorkflowOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForSecurityReviewClosure: true;
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

export interface FiscalRealProvisioningSecurityReport {
  generatedAt: string;
  status: FiscalRealProvisioningSecurityStatus | string;
  checklist: any;
  approvalMatrix: any;
  segregationOfDuties: any;
  blockers: any;
  risks: any;
  evaluation: any;
  decision: any;
  recommendations: string[];
  readOnly: true;
  securityReviewOnly: true;
  approvalWorkflowOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForSecurityReviewClosure: true;
  approvedForIacApply: false;
  approvedForInfrastructureProvisioning: false;
  approvedForEnvironmentActivation: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
