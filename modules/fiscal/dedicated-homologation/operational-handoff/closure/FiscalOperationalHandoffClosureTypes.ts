export enum FiscalOperationalHandoffClosureStatus {
  OPERATIONAL_HANDOFF_GOVERNANCE_CLOSURE_READY = 'OPERATIONAL_HANDOFF_GOVERNANCE_CLOSURE_READY',
  LEGAL_SIGNOFF_READINESS_EVIDENCE_READY = 'LEGAL_SIGNOFF_READINESS_EVIDENCE_READY',
  BLOCKED_FOR_REAL_OPERATIONAL_SIGNOFF = 'BLOCKED_FOR_REAL_OPERATIONAL_SIGNOFF',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalOperationalHandoffClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  closurePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  metadata?: any;
  forceGrantLegalSignOff?: boolean;
  forcePersistLegalSignature?: boolean;
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

export interface FiscalOperationalHandoffClosureResult {
  success: boolean;
  status: FiscalOperationalHandoffClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  closureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  legalSignOffReadinessGenerated: boolean;
  finalRunbookHandoffGenerated: boolean;
  postHandoffRoadmapGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  operationalHandoffGovernanceClosureOnly: true;
  legalSignOffReadinessEvidenceOnly: true;
  realLegalSignOffGranted: false;
  legalSignaturePersisted: false;
  committeeApprovalGranted: false;
  realRiskAccepted: false;
  realWaiverGranted: false;
  externalApproverNotified: false;
  realTicketCreated: false;
  realIncidentOpened: false;
  runbookExecuted: false;
  observabilityInstalled: false;
  productionAlertCreated: false;
  webhookSent: false;
  slackSent: false;
  whatsappSent: false;
  emailSent: false;
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
  approvedForOperationalHandoffClosure: true;
  approvedForLegalSignOffReadinessEvidence: true;
  approvedForRealLegalSignOff: false;
  approvedForRealCommitteeApproval: false;
  approvedForRealOperationalHandoff: false;
  approvedForProductionV2: false;
}
