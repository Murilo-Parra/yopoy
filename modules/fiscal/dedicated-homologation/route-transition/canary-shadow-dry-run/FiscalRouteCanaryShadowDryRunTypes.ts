export enum FiscalRouteCanaryShadowStatus {
  CANARY_SHADOW_DRY_RUN_READY = 'CANARY_SHADOW_DRY_RUN_READY',
  TRAFFIC_MIRROR_APPROVAL_GATE_READY = 'TRAFFIC_MIRROR_APPROVAL_GATE_READY',
  BLOCKED_FOR_REAL_CANARY_OR_SHADOW_TRAFFIC = 'BLOCKED_FOR_REAL_CANARY_OR_SHADOW_TRAFFIC',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRouteCanaryShadowInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  canaryPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceActivateCanary?: boolean;
  forceEnableShadowTraffic?: boolean;
  forceMirrorRealTraffic?: boolean;
  forceDuplicateRequest?: boolean;
  forceCaptureResponse?: boolean;
  forceCapturePayload?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceInstallProxy?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceModifyAppUse?: boolean;
  forceModifyRouterUse?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
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

export interface FiscalRouteCanaryShadowResult {
  success: boolean;
  status: FiscalRouteCanaryShadowStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  canaryScopeSimulationGenerated: boolean;
  shadowTrafficPlanGenerated: boolean;
  trafficMirrorApprovalGateGenerated: boolean;
  canaryEligibilityGenerated: boolean;
  mirrorSafetyChecklistGenerated: boolean;
  shadowNoCaptureEvidenceGenerated: boolean;
  canaryRollbackReadinessGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  canaryShadowingDryRunOnly: true;
  trafficMirrorApprovalGateOnly: true;
  canaryActivationSimulated: true;
  shadowTrafficSimulated: true;
  trafficMirrorSimulated: true;
  canaryActivated: false;
  shadowTrafficEnabled: false;
  realTrafficMirrored: false;
  requestDuplicated: false;
  requestCaptured: false;
  responseCaptured: false;
  payloadCaptured: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
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
  approvedForCanaryShadowDryRun: true;
  approvedForTrafficMirrorApprovalGate: true;
  approvedForRealCanaryActivation: false;
  approvedForRealShadowTraffic: false;
  approvedForRealTrafficMirror: false;
  approvedForRealRouteTransition: false;
  approvedForProductionV2: false;
}
