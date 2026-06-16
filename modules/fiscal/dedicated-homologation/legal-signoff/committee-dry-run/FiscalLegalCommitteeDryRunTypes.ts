export enum FiscalLegalCommitteeDryRunStatus {
  LEGAL_SIGNOFF_COMMITTEE_DRY_RUN_READY = 'LEGAL_SIGNOFF_COMMITTEE_DRY_RUN_READY',
  LEGAL_RISK_ACCEPTANCE_REVIEW_READY = 'LEGAL_RISK_ACCEPTANCE_REVIEW_READY',
  BLOCKED_FOR_REAL_LEGAL_COMMITTEE_APPROVAL = 'BLOCKED_FOR_REAL_LEGAL_COMMITTEE_APPROVAL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalCommitteeDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  committeePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  legalReviewer?: string;
  riskReviewer?: string;
  committeeChair?: string;
  metadata?: any;
  forceGrantLegalSignOff?: boolean;
  forcePersistLegalSignature?: boolean;
  forceCreateDefinitiveLegalRecord?: boolean;
  forceGrantCommitteeApproval?: boolean;
  forceAcceptRealRisk?: boolean;
  forceGrantRealWaiver?: boolean;
  forceNotifyExternalApprover?: boolean;
  forceNotifyExternalSigner?: boolean;
  forceSendWebhook?: boolean;
  forceSendSlack?: boolean;
  forceSendWhatsapp?: boolean;
  forceSendEmail?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
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
}

export interface FiscalLegalCommitteeDryRunResult {
  success: boolean;
  status: FiscalLegalCommitteeDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  committeeCharterGenerated: boolean;
  approvalMatrixGenerated: boolean;
  quorumSimulationGenerated: boolean;
  riskAcceptanceReviewGenerated: boolean;
  waiverReviewGenerated: boolean;
  signatureEvidenceReviewGenerated: boolean;
  finalRecommendationGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalSignoffCommitteeDryRunOnly: true;
  legalRiskAcceptanceReviewOnly: true;
  committeeApprovalGranted: false;
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
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  pdfGenerated: false;
  runbookExecuted: false;
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
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForLegalCommitteeDryRun: true;
  approvedForLegalRiskAcceptanceReview: true;
  approvedForRealCommitteeApproval: false;
  approvedForRealLegalSignOff: false;
  approvedForRealRiskAcceptance: false;
  approvedForRealWaiver: false;
  approvedForProductionV2: false;
}
