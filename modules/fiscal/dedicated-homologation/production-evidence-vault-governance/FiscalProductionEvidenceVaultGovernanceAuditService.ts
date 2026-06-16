export class FiscalProductionEvidenceVaultGovernanceAuditService {
  private static logs: any[] = [];

  public static audit(action: string, details?: any) {
    this.logs.push({
      action,
      timestamp: new Date().toISOString(),
      details,
      realEvidenceVaultCreated: false,
      realEvidencePersisted: false,
      realAuditRecordPersisted: false,
      fileSystemWritten: false,
      databaseWritten: false,
      externalStorageUploaded: false,
      realEvidenceExported: false,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      realPfxRead: false,
      realCertificateRead: false,
      certificatePasswordRead: false,
      realSecretRead: false,
      privateKeyRead: false,
      tokenRead: false,
      realCryptoUsed: false,
      realPayloadHashed: false,
      xmlSigned: false,
      pdfGenerated: false,
      realSefazCalled: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      pagerSent: false,
      pagerDutySent: false,
      opsgenieSent: false
    });
  }

  public static getLogs() {
    return [...this.logs];
  }
}
