export enum FiscalProductionActivationStatus {
  PRODUCTION_ACTIVATION_BLUEPRINT_READY = 'PRODUCTION_ACTIVATION_BLUEPRINT_READY',
  ZERO_EXECUTION_RELEASE_CONTRACT_READY = 'ZERO_EXECUTION_RELEASE_CONTRACT_READY',
  BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION = 'BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionActivationInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  activationPurpose?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceInstallCanary?: boolean;
  forceRouteToV2?: boolean;
  forceActivateRelease?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceCreateRealLedger?: boolean;
  forcePersistLegalTrail?: boolean;
  forceCalculateRealHash?: boolean;
  forceSignLegalTrail?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceConnectRealDatabase?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
}

export interface FiscalProductionActivationResult {
  success: boolean;
  status: FiscalProductionActivationStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  activationBlueprintGenerated: boolean;
  releaseContractGenerated: boolean;
  trafficSwitchPlanGenerated: boolean;
  canaryPlanGenerated: boolean;
  rollbackPlanGenerated: boolean;
  killSwitchPlanGenerated: boolean;
  readinessChecklistGenerated: boolean;
  dependencyInventoryGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionActivationBlueprintOnly: true;
  zeroExecutionReleaseContractOnly: true;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  realLedgerCreated: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
  realHashCalculated: false;
  legalTrailSigned: false;
  dmlExecuted: false;
  ddlExecuted: false;
  realDatabaseConnected: false;
  realSefazCalled: false;
  realCertificateLoaded: false;
  xmlSigned: false;
  pdfGenerated: false;
  workersCreated: false;
  schedulersCreated: false;
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForProductionActivationBlueprint: true;
  approvedForZeroExecutionReleaseContract: true;
  approvedForRealProductionActivation: false;
  approvedForRealTrafficSwitch: false;
  approvedForRealCanary: false;
  approvedForRealRelease: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
