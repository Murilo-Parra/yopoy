export enum FiscalLegalSignOffStatus {
  LEGAL_SIGNOFF_BLUEPRINT_READY = 'LEGAL_SIGNOFF_BLUEPRINT_READY',
  NON_EXECUTABLE_SIGNATURE_CONTRACT_READY = 'NON_EXECUTABLE_SIGNATURE_CONTRACT_READY',
  BLOCKED_FOR_REAL_LEGAL_SIGNOFF = 'BLOCKED_FOR_REAL_LEGAL_SIGNOFF',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalLegalSignOffInput {
  requestedBy?: string;
  companyId?: string;
  requestId?: string;
  signOffPurpose?: string;
  targetTeam?: string;
  targetTenantScope?: string;
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

export interface FiscalLegalSignOffResult {
  success: boolean;
  status: FiscalLegalSignOffStatus | string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  charterGenerated: boolean;
  signerResponsibilityMatrixGenerated: boolean;
  signatureEnvelopeGenerated: boolean;
  evidenceDependencyMatrixGenerated: boolean;
  readinessChecklistGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  legalSignoffBlueprintOnly: true;
  nonExecutableSignatureContractOnly: true;
  realLegalSignOffGranted: false;
  legalSignaturePersisted: false;
  definitiveLegalRecordCreated: false;
  realCertificateLoaded: false;
  realPfxRead: false;
  certificatePasswordRead: false;
  xmlSigned: false;
  pdfGenerated: false;
  externalSignerNotified: false;
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
  approvedForLegalSignOffBlueprint: true;
  approvedForNonExecutableSignatureContract: true;
  approvedForRealLegalSignOff: false;
  approvedForRealSignaturePersistence: false;
  approvedForProductionV2: false;
}
