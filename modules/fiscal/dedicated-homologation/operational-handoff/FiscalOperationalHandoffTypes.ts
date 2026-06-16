export enum FiscalOperationalHandoffStatus {
  OPERATIONAL_HANDOFF_BLUEPRINT_READY = 'OPERATIONAL_HANDOFF_BLUEPRINT_READY',
  RUNBOOK_READINESS_CONTRACT_READY = 'RUNBOOK_READINESS_CONTRACT_READY',
  BLOCKED_FOR_REAL_OPERATIONAL_HANDOFF = 'BLOCKED_FOR_REAL_OPERATIONAL_HANDOFF',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalOperationalHandoffInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  handoffPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceExecuteRunbook?: boolean;
  forceOpenRealIncident?: boolean;
  forceNotifyExternalOperator?: boolean;
  forceInstallObservability?: boolean;
  forceCreateProductionAlert?: boolean;
  forceActivateProductionV2?: boolean;
  forceActivateRelease?: boolean;
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

export interface FiscalOperationalHandoffResult {
  success: boolean;
  status: FiscalOperationalHandoffStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  runbookBlueprintGenerated: boolean;
  responsibilityMatrixGenerated: boolean;
  supportEscalationGenerated: boolean;
  incidentResponseGenerated: boolean;
  observabilityReadinessGenerated: boolean;
  changeFreezeGenerated: boolean;
  communicationMatrixGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  operationalHandoffBlueprintOnly: true;
  runbookReadinessContractOnly: true;
  runbookExecuted: false;
  realIncidentOpened: false;
  externalOperatorNotified: false;
  observabilityInstalled: false;
  productionAlertCreated: false;
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
  approvedForOperationalHandoffBlueprint: true;
  approvedForRunbookReadinessContract: true;
  approvedForRealOperationalHandoff: false;
  approvedForRunbookExecution: false;
  approvedForProductionV2: false;
}
