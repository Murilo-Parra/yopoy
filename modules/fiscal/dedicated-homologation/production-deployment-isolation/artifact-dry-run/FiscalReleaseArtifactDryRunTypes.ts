export enum FiscalReleaseArtifactDryRunStatus {
  RELEASE_ARTIFACT_MANIFEST_READY = 'RELEASE_ARTIFACT_MANIFEST_READY',
  DEPLOYMENT_PACKAGE_DRY_RUN_READY = 'DEPLOYMENT_PACKAGE_DRY_RUN_READY',
  BLOCKED_FOR_REAL_RELEASE_PACKAGE = 'BLOCKED_FOR_REAL_RELEASE_PACKAGE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalReleaseArtifactDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  artifactPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceGenerateExecutableArtifact?: boolean;
  forcePublishRealPackage?: boolean;
  forceExecuteRealRelease?: boolean;
  forceExecuteRealDeploy?: boolean;
  forceExecuteRealRollout?: boolean;
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

export interface FiscalReleaseArtifactDryRunResult {
  success: boolean;
  status: FiscalReleaseArtifactDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  releaseArtifactManifestGenerated: boolean;
  deploymentPackageManifestGenerated: boolean;
  artifactIntegrityPlanGenerated: boolean;
  packageShapeValidatorGenerated: boolean;
  nonExecutableContractGenerated: boolean;
  packageBoundaryPlanGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  releaseArtifactManifestOnly: true;
  deploymentPackageDryRunOnly: true;
  nonExecutableArtifactOnly: true;
  executableArtifactGenerated: false;
  realPackagePublished: false;
  releaseActivated: false;
  realDeployExecuted: false;
  realRolloutExecuted: false;
  productionV2Activated: false;
  routeToV2: false;
  routeToLegacy: true;
  trafficChanged: false;
  proxyInstalled: false;
  middlewareInstalled: false;
  tapInstalled: false;
  appUseModified: false;
  routerUseModified: false;
  realRouteExecuted: false;
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
  approvedForReleaseArtifactManifest: true;
  approvedForDeploymentPackageDryRun: true;
  approvedForRealPackagePublication: false;
  approvedForRealRelease: false;
  approvedForRealDeploy: false;
  approvedForProductionV2: false;
}
