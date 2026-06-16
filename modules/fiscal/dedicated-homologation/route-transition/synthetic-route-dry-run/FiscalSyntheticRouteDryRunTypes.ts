export enum FiscalSyntheticRouteDryRunStatus {
  SYNTHETIC_ROUTE_DRY_RUN_READY = 'SYNTHETIC_ROUTE_DRY_RUN_READY',
  RESPONSE_SHAPE_COMPARATOR_READY = 'RESPONSE_SHAPE_COMPARATOR_READY',
  BLOCKED_FOR_REAL_ROUTE_EXECUTION = 'BLOCKED_FOR_REAL_ROUTE_EXECUTION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalSyntheticRouteDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  scenarioId?: string;
  comparisonPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceCallRealEndpoint?: boolean;
  forceCallLegacyHandler?: boolean;
  forceCallV2Handler?: boolean;
  forceCaptureRequest?: boolean;
  forceCaptureResponse?: boolean;
  forceCapturePayload?: boolean;
  forceDuplicateRequest?: boolean;
  forceMirrorRealTraffic?: boolean;
  forceEnableShadowTraffic?: boolean;
  forceExecuteRealCutover?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
  forceActivateCanary?: boolean;
  forceExecuteRealFallback?: boolean;
  forceInstallProxy?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceModifyAppUse?: boolean;
  forceModifyRouterUse?: boolean;
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

export interface FiscalSyntheticRouteDryRunResult {
  success: boolean;
  status: FiscalSyntheticRouteDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  scenarioCatalogGenerated: boolean;
  legacyResponseShapesGenerated: boolean;
  v2ResponseShapesGenerated: boolean;
  shapeComparatorGenerated: boolean;
  compatibilityMatrixGenerated: boolean;
  contractDiffGenerated: boolean;
  noHandlerCallEvidenceGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  syntheticRouteDryRunOnly: true;
  responseShapeComparatorOnly: true;
  syntheticScenarioOnly: true;
  safeShapeOnly: true;
  realRouteExecuted: false;
  realEndpointCalled: false;
  legacyHandlerCalled: false;
  v2HandlerCalled: false;
  requestCaptured: false;
  responseCaptured: false;
  payloadCaptured: false;
  requestDuplicated: false;
  realTrafficMirrored: false;
  shadowTrafficEnabled: false;
  cutoverExecuted: false;
  realRouteTransitionExecuted: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
  canaryActivated: false;
  realFallbackExecuted: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
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
  approvedForSyntheticRouteDryRun: true;
  approvedForResponseShapeComparison: true;
  approvedForRealRouteExecution: false;
  approvedForRealRouteTransition: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
