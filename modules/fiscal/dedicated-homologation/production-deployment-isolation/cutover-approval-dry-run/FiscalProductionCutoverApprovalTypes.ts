export enum FiscalProductionCutoverApprovalStatus {
  PRODUCTION_CUTOVER_APPROVAL_DRY_RUN_READY = 'PRODUCTION_CUTOVER_APPROVAL_DRY_RUN_READY',
  ROLLBACK_GOVERNANCE_DRY_RUN_READY = 'ROLLBACK_GOVERNANCE_DRY_RUN_READY',
  BLOCKED_FOR_REAL_CUTOVER = 'BLOCKED_FOR_REAL_CUTOVER',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionCutoverApprovalInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  cutoverPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceApproveRealCutover?: boolean;
  forceExecuteRealCutover?: boolean;
  forceExecuteRealRollback?: boolean;
  forceActivateProductionV2?: boolean;
  forceExecuteRealRelease?: boolean;
  forceExecuteRealDeploy?: boolean;
  forceExecuteRealRollout?: boolean;
  forcePublishRealPackage?: boolean;
  forceGenerateExecutableArtifact?: boolean;
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

export interface FiscalProductionCutoverApprovalResult {
  success: boolean;
  status: FiscalProductionCutoverApprovalStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  cutoverReadinessPlanGenerated: boolean;
  rollbackGovernancePlanGenerated: boolean;
  goNoGoApprovalMatrixGenerated: boolean;
  changeWindowReadinessGenerated: boolean;
  operationalFreezePlanGenerated: boolean;
  cutoverAbortCriteriaGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionCutoverApprovalDryRunOnly: true;
  rollbackGovernanceDryRunOnly: true;
  goNoGoSimulationOnly: true;
  realCutoverApproved: false;
  cutoverExecuted: false;
  realRollbackExecuted: false;
  productionV2Activated: false;
  releaseActivated: false;
  realDeployExecuted: false;
  realRolloutExecuted: false;
  executableArtifactGenerated: false;
  realPackagePublished: false;
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
  approvedForCutoverApprovalDryRun: true;
  approvedForRollbackGovernanceDryRun: true;
  approvedForRealCutover: false;
  approvedForRealRollback: false;
  approvedForRealRelease: false;
  approvedForRealDeploy: false;
  approvedForProductionV2: false;
}
