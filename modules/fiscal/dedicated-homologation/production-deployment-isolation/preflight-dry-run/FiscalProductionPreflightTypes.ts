export enum FiscalProductionPreflightStatus {
  PRODUCTION_DEPLOYMENT_PREFLIGHT_READY = 'PRODUCTION_DEPLOYMENT_PREFLIGHT_READY',
  DEPLOYMENT_READINESS_DRY_RUN_READY = 'DEPLOYMENT_READINESS_DRY_RUN_READY',
  BLOCKED_FOR_REAL_DEPLOYMENT = 'BLOCKED_FOR_REAL_DEPLOYMENT',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionPreflightInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  preflightPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceApproveRealDeploy?: boolean;
  forceExecuteRealDeploy?: boolean;
  forceExecuteRealRelease?: boolean;
  forceExecuteRealRollout?: boolean;
  forceApproveRealCutover?: boolean;
  forceExecuteRealCutover?: boolean;
  forceExecuteRealRollback?: boolean;
  forcePublishRealPackage?: boolean;
  forceGenerateExecutableArtifact?: boolean;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
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

export interface FiscalProductionPreflightResult {
  success: boolean;
  status: FiscalProductionPreflightStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  deploymentReadinessChecklistGenerated: boolean;
  environmentReadinessGenerated: boolean;
  artifactReadinessGenerated: boolean;
  cutoverReadinessGenerated: boolean;
  rollbackReadinessGenerated: boolean;
  trafficReadinessGenerated: boolean;
  securityBoundaryCheckGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionDeploymentPreflightOnly: true;
  deploymentReadinessDryRunOnly: true;
  preflightCheckOnly: true;
  realDeployApproved: false;
  realDeployExecuted: false;
  releaseActivated: false;
  realRolloutExecuted: false;
  realCutoverApproved: false;
  cutoverExecuted: false;
  realRollbackExecuted: false;
  executableArtifactGenerated: false;
  realPackagePublished: false;
  productionV2Activated: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  realEndpointCalled: false;
  legacyHandlerCalled: false;
  v2HandlerCalled: false;
  requestCaptured: false;
  responseCaptured: false;
  payloadCaptured: false;
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
  approvedForPreflightDryRun: true;
  approvedForDeploymentReadinessDryRun: true;
  approvedForRealDeploy: false;
  approvedForRealRelease: false;
  approvedForRealCutover: false;
  approvedForRealRollback: false;
  approvedForProductionV2: false;
}
