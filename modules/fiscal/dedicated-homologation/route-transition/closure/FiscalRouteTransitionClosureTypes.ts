export enum FiscalRouteTransitionClosureStatus {
  ROUTE_TRANSITION_CLOSURE_READY = 'ROUTE_TRANSITION_CLOSURE_READY',
  PRODUCTION_HANDOFF_DRY_RUN_READY = 'PRODUCTION_HANDOFF_DRY_RUN_READY',
  FINAL_EVIDENCE_PACKAGE_READY = 'FINAL_EVIDENCE_PACKAGE_READY',
  BLOCKED_FOR_REAL_ROUTE_TRANSITION = 'BLOCKED_FOR_REAL_ROUTE_TRANSITION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalRouteTransitionClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  closurePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceApproveRealRouteTransition?: boolean;
  forceExecuteRealCutover?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceChangeTraffic?: boolean;
  forceInstallProxy?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceModifyAppUse?: boolean;
  forceModifyRouterUse?: boolean;
  forceCallRealEndpoint?: boolean;
  forceCallLegacyHandler?: boolean;
  forceCallV2Handler?: boolean;
  forceCaptureRequest?: boolean;
  forceCaptureResponse?: boolean;
  forceCapturePayload?: boolean;
  forceDuplicateRequest?: boolean;
  forceMirrorRealTraffic?: boolean;
  forceEnableShadowTraffic?: boolean;
  forceActivateCanary?: boolean;
  forceExecuteRealFallback?: boolean;
  forceCreateRealSandbox?: boolean;
  forceCreateWalledGarden?: boolean;
  forceProvisionNetwork?: boolean;
  forceProvisionDatabase?: boolean;
  forceCreateTenantIsolation?: boolean;
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

export interface FiscalRouteTransitionClosureResult {
  success: boolean;
  status: FiscalRouteTransitionClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  closureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  productionHandoffGenerated: boolean;
  postClosureRoadmapGenerated: boolean;
  finalBlockersGenerated: boolean;
  finalRisksGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  routeTransitionHandoffOnly: true;
  finalEvidenceClosureOnly: true;
  productionHandoffDryRunOnly: true;
  realRouteTransitionApproved: false;
  realRouteTransitionExecuted: false;
  realRouteExecuted: false;
  realEndpointCalled: false;
  legacyHandlerCalled: false;
  v2HandlerCalled: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  requestDuplicated: false;
  requestCaptured: false;
  responseCaptured: false;
  payloadCaptured: false;
  realTrafficMirrored: false;
  shadowTrafficEnabled: false;
  canaryActivated: false;
  cutoverExecuted: false;
  shadowRollbackExecuted: false;
  realFallbackExecuted: false;
  sandboxCreated: false;
  walledGardenCreated: false;
  networkProvisioned: false;
  databaseProvisioned: false;
  tenantIsolationCreated: false;
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
  approvedForRouteTransitionClosure: true;
  approvedForProductionHandoffDryRun: true;
  approvedForFinalEvidencePackage: true;
  approvedForRealRouteTransition: false;
  approvedForRealCutover: false;
  approvedForProductionV2: false;
}
