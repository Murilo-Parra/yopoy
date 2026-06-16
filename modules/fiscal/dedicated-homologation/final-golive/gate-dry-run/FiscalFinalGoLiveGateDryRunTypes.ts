export enum FiscalFinalGoLiveGateDryRunStatus {
  FINAL_GOLIVE_GATE_DRY_RUN_READY = 'FINAL_GOLIVE_GATE_DRY_RUN_READY',
  MOCK_ACTIVATION_RUNBOOK_READY = 'MOCK_ACTIVATION_RUNBOOK_READY',
  BLOCKED_FOR_REAL_GOLIVE_ACTIVATION = 'BLOCKED_FOR_REAL_GOLIVE_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalFinalGoLiveGateDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  gatePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceActivateRelease?: boolean;
  forceActivateCanary?: boolean;
  forceExecuteRealRunbook?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceGrantLegalSignOff?: boolean;
  forcePersistLegalSignature?: boolean;
  forceCreateDefinitiveLegalRecord?: boolean;
  forceAcceptRealRisk?: boolean;
  forceGrantRealWaiver?: boolean;
  forceNotifyExternalApprover?: boolean;
  forceNotifyExternalSigner?: boolean;
  forceSendWebhook?: boolean;
  forceSendSlack?: boolean;
  forceSendWhatsapp?: boolean;
  forceSendEmail?: boolean;
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

export interface FiscalFinalGoLiveGateDryRunResult {
  success: boolean;
  status: FiscalFinalGoLiveGateDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  gateEligibilityGenerated: boolean;
  mockActivationRunbookGenerated: boolean;
  gateUnlockSimulationGenerated: boolean;
  trafficSwitchSimulationGenerated: boolean;
  rollbackSimulationGenerated: boolean;
  killSwitchSimulationGenerated: boolean;
  decisionCheckpointsGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  finalGoLiveGateDryRunOnly: true;
  mockActivationRunbookOnly: true;
  gateUnlockSimulated: true;
  trafficSwitchSimulated: true;
  rollbackSimulated: true;
  killSwitchSimulated: true;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  realRunbookExecuted: false;
  appUseModified: false;
  middlewareInstalled: false;
  tapInstalled: false;
  workersCreated: false;
  schedulersCreated: false;
  realExecutionGateUnlocked: false;
  realAuthorizationGranted: false;
  realLegalSignOffGranted: false;
  legalSignaturePersisted: false;
  definitiveLegalRecordCreated: false;
  realRiskAccepted: false;
  realWaiverGranted: false;
  externalApproverNotified: false;
  externalSignerNotified: false;
  webhookSent: false;
  slackSent: false;
  whatsappSent: false;
  emailSent: false;
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
  approvedForFinalGoLiveGateDryRun: true;
  approvedForMockActivationRunbook: true;
  approvedForRealProductionActivation: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
