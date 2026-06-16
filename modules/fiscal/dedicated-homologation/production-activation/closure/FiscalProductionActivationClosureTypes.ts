export enum FiscalProductionActivationClosureStatus {
  PRODUCTION_ACTIVATION_GOVERNANCE_CLOSURE_READY = 'PRODUCTION_ACTIVATION_GOVERNANCE_CLOSURE_READY',
  FINAL_RELEASE_HANDOFF_EVIDENCE_READY = 'FINAL_RELEASE_HANDOFF_EVIDENCE_READY',
  BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION = 'BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionActivationClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  closurePurpose?: string;
  targetTenantScope?: string;
  targetCompanyIds?: string[];
  targetCnpjs?: string[];
  metadata?: any;
  forceActivateProductionV2?: boolean;
  forceActivateRelease?: boolean;
  forceActivateCanary?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceExecuteDualRun?: boolean;
  forceDuplicateRealTraffic?: boolean;
  forceCaptureRealRequest?: boolean;
  forceCaptureRealResponse?: boolean;
  forceExecuteRollback?: boolean;
  forceInstallKillSwitch?: boolean;
  forceCallV2Handler?: boolean;
  forceCallLegacyHandler?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceCompleteDualApproval?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
}

export interface FiscalProductionActivationClosureResult {
  success: boolean;
  status: FiscalProductionActivationClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  closureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  finalReadinessReviewGenerated: boolean;
  finalReleaseHandoffGenerated: boolean;
  postClosureRoadmapGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  productionActivationGovernanceClosureOnly: true;
  finalReleaseHandoffEvidenceOnly: true;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  dualRunExecuted: false;
  realTrafficDuplicated: false;
  realRequestCaptured: false;
  realResponseCaptured: false;
  rollbackExecuted: false;
  killSwitchInstalled: false;
  killSwitchActivated: false;
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
  dualApprovalCompleted: false;
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
  approvedForProductionActivationClosure: true;
  approvedForFinalReleaseHandoffEvidence: true;
  approvedForRealProductionActivation: false;
  approvedForRealRelease: false;
  approvedForRealCanary: false;
  approvedForRealTrafficSwitch: false;
  approvedForRealDualRun: false;
  approvedForRealRollback: false;
  approvedForRealKillSwitch: false;
  approvedForProductionV2: false;
}
