export enum FiscalProductionCanaryDryRunStatus {
  CANARY_SCOPE_DRY_RUN_READY = 'CANARY_SCOPE_DRY_RUN_READY',
  TRAFFIC_SWITCH_DRY_RUN_READY = 'TRAFFIC_SWITCH_DRY_RUN_READY',
  BLOCKED_FOR_REAL_CANARY_ACTIVATION = 'BLOCKED_FOR_REAL_CANARY_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionCanaryDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  targetTenantScope?: string;
  targetCompanyIds?: string[];
  targetCnpjs?: string[];
  intendedCanaryPercentage?: number;
  activationPurpose?: string;
  metadata?: any;
  forceActivateCanary?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceActivateRelease?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
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

export interface FiscalProductionCanaryDryRunResult {
  success: boolean;
  status: FiscalProductionCanaryDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  scopeCatalogGenerated: boolean;
  tenantEligibilityGenerated: boolean;
  trafficSwitchPlanGenerated: boolean;
  percentagePlanGenerated: boolean;
  killSwitchReadinessGenerated: boolean;
  rollbackReadinessGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  canaryScopeDryRunOnly: true;
  trafficSwitchDryRunOnly: true;
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
  approvedForCanaryScopeDryRun: true;
  approvedForTrafficSwitchDryRun: true;
  approvedForRealCanaryActivation: false;
  approvedForRealTrafficSwitch: false;
  approvedForRealRouteToV2: false;
  approvedForRealRelease: false;
  approvedForProductionV2: false;
}
