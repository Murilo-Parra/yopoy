export enum FiscalRouteProxyDryRunStatus {
  ROUTE_PROXY_DRY_RUN_READY = 'ROUTE_PROXY_DRY_RUN_READY',
  NO_INTERCEPTION_SIMULATION_READY = 'NO_INTERCEPTION_SIMULATION_READY',
  BLOCKED_FOR_REAL_PROXY_INSTALLATION = 'BLOCKED_FOR_REAL_PROXY_INSTALLATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRouteProxyDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  proxyPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceInstallProxy?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceModifyAppUse?: boolean;
  forceModifyRouterUse?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
  forceCaptureRequest?: boolean;
  forceCaptureResponse?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceActivateProductionV2?: boolean;
  forceActivateRelease?: boolean;
  forceActivateCanary?: boolean;
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

export interface FiscalRouteProxyDryRunResult {
  success: boolean;
  status: FiscalRouteProxyDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  proxyBlueprintGenerated: boolean;
  middlewareSimulationGenerated: boolean;
  tapSimulationGenerated: boolean;
  conditionalRoutingSimulationGenerated: boolean;
  noInterceptionEvidenceGenerated: boolean;
  fallbackSimulationGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  proxyMiddlewareDryRunOnly: true;
  noInterceptionSimulationOnly: true;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
  requestCaptured: false;
  responseCaptured: false;
  v2HandlerCalled: false;
  legacyHandlerCalledAsSideEffect: false;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
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
  approvedForRouteProxyDryRun: true;
  approvedForNoInterceptionSimulation: true;
  approvedForRealProxyInstallation: false;
  approvedForRealMiddlewareInstall: false;
  approvedForRealRouteTransition: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
