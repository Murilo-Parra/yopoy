export enum FiscalLegalSignatureDryRunStatus {
  LEGAL_SIGNOFF_SIMULATION_GATE_READY = 'LEGAL_SIGNOFF_SIMULATION_GATE_READY',
  MOCK_SIGNATURE_WORKFLOW_READY = 'MOCK_SIGNATURE_WORKFLOW_READY',
  BLOCKED_FOR_REAL_LEGAL_SIGNATURE = 'BLOCKED_FOR_REAL_LEGAL_SIGNATURE',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalSignatureDryRunInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  signaturePurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
  signerA?: string;
  signerB?: string;
  legalReviewer?: string;
  metadata?: any;
  forceGrantLegalSignOff?: boolean;
  forcePersistLegalSignature?: boolean;
  forceCreateDefinitiveLegalRecord?: boolean;
  forceLoadRealCertificate?: boolean;
  forceReadRealPfx?: boolean;
  forceReadCertificatePassword?: boolean;
  forceSignRealXml?: boolean;
  forceGenerateRealPdf?: boolean;
  forceNotifyExternalSigner?: boolean;
  forceSendWebhook?: boolean;
  forceSendSlack?: boolean;
  forceSendWhatsapp?: boolean;
  forceSendEmail?: boolean;
  forceGrantCommitteeApproval?: boolean;
  forceAcceptRealRisk?: boolean;
  forceGrantRealWaiver?: boolean;
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

export interface FiscalLegalSignatureDryRunResult {
  success: boolean;
  status: FiscalLegalSignatureDryRunStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  signerEligibilityGenerated: boolean;
  signatureIntentEnvelopeGenerated: boolean;
  mockSignatureWorkflowGenerated: boolean;
  quorumSimulationGenerated: boolean;
  sodReviewGenerated: boolean;
  evidenceReviewGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalSignoffSimulationGateOnly: true;
  mockSignatureWorkflowOnly: true;
  realLegalSignOffGranted: false;
  mockSignatureSimulated: true;
  legalSignaturePersisted: false;
  definitiveLegalRecordCreated: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  pdfGenerated: false;
  externalSignerNotified: false;
  webhookSent: false;
  slackSent: false;
  whatsappSent: false;
  emailSent: false;
  committeeApprovalGranted: false;
  realRiskAccepted: false;
  realWaiverGranted: false;
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
  approvedForLegalSignatureDryRun: true;
  approvedForMockSignatureWorkflow: true;
  approvedForRealLegalSignOff: false;
  approvedForRealSignaturePersistence: false;
  approvedForProductionV2: false;
}
