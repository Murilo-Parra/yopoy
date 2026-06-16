export enum FiscalProductionReleaseGatewayStatus {
  PRODUCTION_RELEASE_GATEWAY_DRY_RUN_READY = 'PRODUCTION_RELEASE_GATEWAY_DRY_RUN_READY',
  ZERO_EXECUTION_READINESS_VALIDATOR_READY = 'ZERO_EXECUTION_READINESS_VALIDATOR_READY',
  BLOCKED_FOR_REAL_RELEASE_ACTIVATION = 'BLOCKED_FOR_REAL_RELEASE_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionReleaseGatewayInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  releasePurpose?: string;
  targetTenantScope?: string;
  targetCompanyIds?: string[];
  targetCnpjs?: string[];
  metadata?: any;
  forceActivateRelease?: boolean;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceInstallCanary?: boolean;
  forceRouteToV2?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceCreateRealLedger?: boolean;
  forcePersistLegalTrail?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
}

export interface FiscalProductionReleaseGatewayResult {
  success: boolean;
  status: FiscalProductionReleaseGatewayStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  releaseHandshakePlanGenerated: boolean;
  authorizationDependencyGenerated: boolean;
  legalAuditDependencyGenerated: boolean;
  canaryDependencyGenerated: boolean;
  rollbackDependencyGenerated: boolean;
  killSwitchDependencyGenerated: boolean;
  sefazReadinessGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionReleaseGatewayDryRunOnly: true;
  zeroExecutionReadinessValidatorOnly: true;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  v2HandlerCalled: false;
  legacyHandlerCalledAsSideEffect: false;
  appUseModified: false;
  middlewareInstalled: false;
  tapInstalled: false;
  realExecutionGateUnlocked: false;
  realExecutionAuthorized: false;
  realAuthorizationGranted: false;
  dualApprovalCompleted: false;
  realLedgerCreated: false;
  legalAuditTrailPersisted: false;
  legalTrailDefinitive: false;
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
  approvedForReleaseGatewayDryRun: true;
  approvedForZeroExecutionReadinessValidation: true;
  approvedForRealReleaseActivation: false;
  approvedForRealProductionActivation: false;
  approvedForRealTrafficSwitch: false;
  approvedForRealCanary: false;
  approvedForRealRouteToV2: false;
  approvedForSefazConnection: false;
  approvedForProductionV2: false;
}
