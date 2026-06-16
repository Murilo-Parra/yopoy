export enum FiscalRouteTransitionStatus {
  ROUTE_TRANSITION_BLUEPRINT_READY = 'ROUTE_TRANSITION_BLUEPRINT_READY',
  LEGACY_PRESERVATION_CONTRACT_READY = 'LEGACY_PRESERVATION_CONTRACT_READY',
  BLOCKED_FOR_REAL_ROUTE_TRANSITION = 'BLOCKED_FOR_REAL_ROUTE_TRANSITION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRouteTransitionInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  transitionPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallProxy?: boolean;
  forceInstallTap?: boolean;
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

export interface FiscalRouteTransitionResult {
  success: boolean;
  status: FiscalRouteTransitionStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  blueprintGenerated: boolean;
  legacyRouteInventoryGenerated: boolean;
  v2RouteReadinessGenerated: boolean;
  legacyPreservationContractGenerated: boolean;
  noInterceptionContractGenerated: boolean;
  fallbackPlanGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  routeTransitionBlueprintOnly: true;
  legacyPreservationContractOnly: true;
  realRouteTransitionExecuted: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  appUseModified: false;
  middlewareInstalled: false;
  proxyInstalled: false;
  tapInstalled: false;
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
  approvedForRouteTransitionBlueprint: true;
  approvedForLegacyPreservationContract: true;
  approvedForRealRouteTransition: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
