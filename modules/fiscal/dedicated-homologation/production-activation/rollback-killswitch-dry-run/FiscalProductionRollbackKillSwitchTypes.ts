export enum FiscalProductionRollbackKillSwitchStatus {
  PRODUCTION_ROLLBACK_DRY_RUN_READY = 'PRODUCTION_ROLLBACK_DRY_RUN_READY',
  KILL_SWITCH_GOVERNANCE_DRY_RUN_READY = 'KILL_SWITCH_GOVERNANCE_DRY_RUN_READY',
  BLOCKED_FOR_REAL_ROLLBACK_OR_KILL_SWITCH = 'BLOCKED_FOR_REAL_ROLLBACK_OR_KILL_SWITCH',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionRollbackKillSwitchInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  rollbackPurpose?: string;
  targetTenantScope?: string;
  targetCompanyIds?: string[];
  targetCnpjs?: string[];
  metadata?: any;
  forceExecuteRollback?: boolean;
  forceInstallKillSwitch?: boolean;
  forceActivateKillSwitch?: boolean;
  forceFreezeRelease?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceRouteToLegacy?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceActivateProductionV2?: boolean;
}

export interface FiscalProductionRollbackKillSwitchResult {
  success: boolean;
  status: FiscalProductionRollbackKillSwitchStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  rollbackPlanGenerated: boolean;
  killSwitchPlanGenerated: boolean;
  legacyFallbackPlanGenerated: boolean;
  releaseFreezePlanGenerated: boolean;
  trafficReversionPlanGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  readinessMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionRollbackDryRunOnly: true;
  killSwitchGovernanceDryRunOnly: true;
  rollbackExecuted: false;
  killSwitchInstalled: false;
  killSwitchActivated: false;
  releaseFrozen: false;
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
  workersCreated: false;
  schedulersCreated: false;
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
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRollbackDryRun: true;
  approvedForKillSwitchGovernanceDryRun: true;
  approvedForRealRollbackExecution: false;
  approvedForRealKillSwitchInstall: false;
  approvedForRealTrafficChange: false;
  approvedForRealRouteToV2: false;
  approvedForProductionV2: false;
}
