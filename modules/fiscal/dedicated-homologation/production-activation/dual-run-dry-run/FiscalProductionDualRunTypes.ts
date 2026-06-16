export enum FiscalProductionDualRunStatus {
  PRODUCTION_DUAL_RUN_DRY_RUN_READY = 'PRODUCTION_DUAL_RUN_DRY_RUN_READY',
  REVERSIBLE_ACTIVATION_TELEMETRY_READY = 'REVERSIBLE_ACTIVATION_TELEMETRY_READY',
  BLOCKED_FOR_REAL_DUAL_RUN_OR_ACTIVATION = 'BLOCKED_FOR_REAL_DUAL_RUN_OR_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionDualRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  dualRunPurpose?: string;
  targetTenantScope?: string;
  targetCompanyIds?: string[];
  targetCnpjs?: string[];
  intendedObservationWindowMinutes?: number;
  metadata?: any;
  forceExecuteDualRun?: boolean;
  forceDuplicateRealTraffic?: boolean;
  forceCaptureRealRequest?: boolean;
  forceCaptureRealResponse?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceActivateProductionV2?: boolean;
  forceActivateRelease?: boolean;
  forceActivateCanary?: boolean;
  forceExecuteRollback?: boolean;
  forceInstallKillSwitch?: boolean;
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

export interface FiscalProductionDualRunResult {
  success: boolean;
  status: FiscalProductionDualRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  dualRunPlanGenerated: boolean;
  telemetryReadinessGenerated: boolean;
  comparisonPlanGenerated: boolean;
  reversibleActivationPlanGenerated: boolean;
  observabilityMatrixGenerated: boolean;
  decisionCheckpointMatrixGenerated: boolean;
  rollbackCriteriaGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionDualRunDryRunOnly: true;
  reversibleActivationTelemetryOnly: true;
  dualRunExecuted: false;
  realTrafficDuplicated: false;
  realRequestCaptured: false;
  realResponseCaptured: false;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  rollbackExecuted: false;
  killSwitchInstalled: false;
  killSwitchActivated: false;
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
  approvedForDualRunDryRun: true;
  approvedForReversibleActivationTelemetry: true;
  approvedForRealDualRun: false;
  approvedForRealTrafficDuplication: false;
  approvedForRealProductionActivation: false;
  approvedForRealRouteToV2: false;
  approvedForProductionV2: false;
}
