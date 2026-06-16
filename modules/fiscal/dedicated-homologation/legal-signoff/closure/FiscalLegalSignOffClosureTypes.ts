export enum FiscalLegalSignOffClosureStatus {
  LEGAL_SIGNOFF_GOVERNANCE_CLOSURE_READY = 'LEGAL_SIGNOFF_GOVERNANCE_CLOSURE_READY',
  FINAL_LEGAL_EVIDENCE_HANDOFF_READY = 'FINAL_LEGAL_EVIDENCE_HANDOFF_READY',
  BLOCKED_FOR_REAL_LEGAL_SIGNATURE_OR_RECORD = 'BLOCKED_FOR_REAL_LEGAL_SIGNATURE_OR_RECORD',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalSignOffClosureInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  closurePurpose?: string;
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
  forceUseRealCrypto?: boolean;
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

export interface FiscalLegalSignOffClosureResult {
  success: boolean;
  status: FiscalLegalSignOffClosureStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  closureInventoryGenerated: boolean;
  finalChecklistGenerated: boolean;
  evidencePackageGenerated: boolean;
  finalSignatureReadinessGenerated: boolean;
  finalCommitteeHandoffGenerated: boolean;
  postSignOffRoadmapGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalSignoffGovernanceClosureOnly: true;
  finalLegalEvidenceHandoffOnly: true;
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
  realCryptoUsed: false;
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
  approvedForLegalSignOffClosure: true;
  approvedForFinalLegalEvidenceHandoff: true;
  approvedForRealCommitteeApproval: false;
  approvedForRealLegalSignOff: false;
  approvedForRealSignaturePersistence: false;
  approvedForDefinitiveLegalRecord: false;
  approvedForProductionV2: false;
}
