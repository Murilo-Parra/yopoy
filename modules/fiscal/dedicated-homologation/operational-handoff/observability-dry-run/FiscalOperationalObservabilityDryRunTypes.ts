export enum FiscalOperationalObservabilityDryRunStatus {
  OPERATIONAL_OBSERVABILITY_DRY_RUN_READY = 'OPERATIONAL_OBSERVABILITY_DRY_RUN_READY',
  ALERTING_GOVERNANCE_DRY_RUN_READY = 'ALERTING_GOVERNANCE_DRY_RUN_READY',
  BLOCKED_FOR_REAL_OBSERVABILITY_OR_ALERTING = 'BLOCKED_FOR_REAL_OBSERVABILITY_OR_ALERTING',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalOperationalObservabilityDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  observabilityPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceInstallObservability?: boolean;
  forceCreateProductionAlert?: boolean;
  forceOpenRealIncident?: boolean;
  forceNotifyExternalOperator?: boolean;
  forceSendWebhook?: boolean;
  forceSendSlack?: boolean;
  forceSendWhatsapp?: boolean;
  forceSendEmail?: boolean;
  forceCaptureRealRequest?: boolean;
  forceCaptureRealResponse?: boolean;
  forceExecuteRunbook?: boolean;
  forceActivateProductionV2?: boolean;
  forceChangeTraffic?: boolean;
  forceModifyAppUse?: boolean;
  forceInstallMiddleware?: boolean;
  forceInstallTap?: boolean;
  forceCreateWorker?: boolean;
  forceCreateScheduler?: boolean;
  forceUnlockGate?: boolean;
  forceGrantRealAuthorization?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceExecuteDdl?: boolean;
  forceCallRealSefaz?: boolean;
  forceLoadRealCertificate?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
}

export interface FiscalOperationalObservabilityDryRunResult {
  success: boolean;
  status: FiscalOperationalObservabilityDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  signalCatalogGenerated: boolean;
  alertingPlanGenerated: boolean;
  dashboardReadinessGenerated: boolean;
  sloSlaMatrixGenerated: boolean;
  incidentTriggerSimulationGenerated: boolean;
  telemetryRetentionGenerated: boolean;
  escalationSignalMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  operationalObservabilityDryRunOnly: true;
  alertingGovernanceDryRunOnly: true;
  observabilityInstalled: false;
  productionAlertCreated: false;
  realIncidentOpened: false;
  externalOperatorNotified: false;
  webhookSent: false;
  slackSent: false;
  whatsappSent: false;
  emailSent: false;
  realRequestCaptured: false;
  realResponseCaptured: false;
  runbookExecuted: false;
  productionV2Activated: false;
  releaseActivated: false;
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
  approvedForObservabilityDryRun: true;
  approvedForAlertingGovernanceDryRun: true;
  approvedForRealObservabilityInstall: false;
  approvedForRealAlerting: false;
  approvedForRealIncidentResponse: false;
  approvedForProductionV2: false;
}
