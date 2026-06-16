export enum FiscalFinalGoLiveStatus {
  FINAL_GOLIVE_BLUEPRINT_READY = 'FINAL_GOLIVE_BLUEPRINT_READY',
  ZERO_EXECUTION_ACTIVATION_CONTRACT_READY = 'ZERO_EXECUTION_ACTIVATION_CONTRACT_READY',
  BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION = 'BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalFinalGoLiveInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  goLivePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceActivateRelease?: boolean;
  forceActivateCanary?: boolean;
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

export interface FiscalFinalGoLiveResult {
  success: boolean;
  status: FiscalFinalGoLiveStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  blueprintGenerated: boolean;
  dependencyInventoryGenerated: boolean;
  readinessChecklistGenerated: boolean;
  activationContractGenerated: boolean;
  trafficFreezePlanGenerated: boolean;
  legalDependencyMatrixGenerated: boolean;
  operationalDependencyMatrixGenerated: boolean;
  productionDependencyMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  finalGoLiveBlueprintOnly: true;
  zeroExecutionActivationContractOnly: true;
  productionV2Activated: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
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
  approvedForFinalGoLiveBlueprint: true;
  approvedForZeroExecutionActivationContract: true;
  approvedForRealProductionActivation: false;
  approvedForProductionV2: false;
  approvedForTrafficSwitch: false;
}
