export enum FiscalOperationalCommitteeDryRunStatus {
  ARCHITECTURE_RISK_COMMITTEE_DRY_RUN_READY = 'ARCHITECTURE_RISK_COMMITTEE_DRY_RUN_READY',
  COMMITTEE_APPROVAL_SIMULATION_READY = 'COMMITTEE_APPROVAL_SIMULATION_READY',
  BLOCKED_FOR_REAL_COMMITTEE_APPROVAL = 'BLOCKED_FOR_REAL_COMMITTEE_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalOperationalCommitteeDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  committeePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceGrantCommitteeApproval?: boolean;
  forceAcceptRealRisk?: boolean;
  forceGrantRealWaiver?: boolean;
  forceNotifyExternalApprover?: boolean;
  forceCreateRealTicket?: boolean;
  forceOpenRealIncident?: boolean;
  forceExecuteRunbook?: boolean;
  forceInstallObservability?: boolean;
  forceCreateProductionAlert?: boolean;
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

export interface FiscalOperationalCommitteeDryRunResult {
  success: boolean;
  status: FiscalOperationalCommitteeDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  architectureCharterGenerated: boolean;
  approvalMatrixGenerated: boolean;
  quorumSimulationGenerated: boolean;
  riskAcceptanceSimulationGenerated: boolean;
  exceptionWaiverSimulationGenerated: boolean;
  evidenceReviewMatrixGenerated: boolean;
  finalRecommendationGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  architectureRiskCommitteeDryRunOnly: true;
  committeeApprovalSimulationOnly: true;
  committeeApprovalGranted: false;
  realRiskAccepted: false;
  realWaiverGranted: false;
  externalApproverNotified: false;
  realTicketCreated: false;
  realIncidentOpened: false;
  runbookExecuted: false;
  observabilityInstalled: false;
  productionAlertCreated: false;
  productionV2Activated: false;
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
  approvedForCommitteeDryRun: true;
  approvedForCommitteeApprovalSimulation: true;
  approvedForRealCommitteeApproval: false;
  approvedForRealRiskAcceptance: false;
  approvedForRealOperationalHandoff: false;
  approvedForProductionV2: false;
}
