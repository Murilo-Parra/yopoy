export enum FiscalRouteCutoverStatus {
  ROUTE_CUTOVER_DRY_RUN_READY = 'ROUTE_CUTOVER_DRY_RUN_READY',
  SHADOW_ROLLBACK_GOVERNANCE_READY = 'SHADOW_ROLLBACK_GOVERNANCE_READY',
  BLOCKED_FOR_REAL_ROUTE_CUTOVER = 'BLOCKED_FOR_REAL_ROUTE_CUTOVER',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRouteCutoverInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  cutoverPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceExecuteRealCutover?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
  forceActivateCanary?: boolean;
  forceExecuteShadowRollback?: boolean;
  forceExecuteRealFallback?: boolean;
  forceInstallProxy?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceModifyAppUse?: boolean;
  forceModifyRouterUse?: boolean;
  forceDuplicateRequest?: boolean;
  forceCaptureResponse?: boolean;
  forceCapturePayload?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceActivateProductionV2?: boolean;
  forceActivateRelease?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceUseRealCrypto?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
}

export interface FiscalRouteCutoverResult {
  success: boolean;
  status: FiscalRouteCutoverStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  cutoverWindowPlanGenerated: boolean;
  cutoverSimulationPlanGenerated: boolean;
  legacyFallbackGovernanceGenerated: boolean;
  shadowRollbackPlanGenerated: boolean;
  abortCriteriaGenerated: boolean;
  decisionMatrixGenerated: boolean;
  readinessChecklistGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  routeCutoverDryRunOnly: true;
  shadowRollbackGovernanceOnly: true;
  cutoverSimulated: true;
  cutoverExecuted: false;
  realRouteTransitionExecuted: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
  canaryActivated: false;
  shadowRollbackExecuted: false;
  realFallbackExecuted: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  requestDuplicated: false;
  requestCaptured: false;
  responseCaptured: false;
  payloadCaptured: false;
  v2HandlerCalled: false;
  legacyHandlerCalledAsSideEffect: false;
  productionV2Activated: false;
  releaseActivated: false;
  workersCreated: false;
  schedulersCreated: false;
  realExecutionGateUnlocked: false;
  realAuthorizationGranted: false;
  dmlExecuted: false;
  ddlExecuted: false;
  realDatabaseConnected: false;
  realSefazCalled: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  realCryptoUsed: false;
  xmlSigned: false;
  pdfGenerated: false;
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRouteCutoverDryRun: true;
  approvedForShadowRollbackGovernance: true;
  approvedForRealRouteCutover: false;
  approvedForRealRouteTransition: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
