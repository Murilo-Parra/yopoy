export class FiscalProductionEvidenceDisclosureAuditService {
  private static logs: any[] = [];

  public static audit(action: string, details?: any) {
    this.logs.push({
      action,
      timestamp: new Date().toISOString(),
      details,
      realEvidenceExported: false,
      realAuditPackageCreated: false,
      realDisclosureFileGenerated: false,
      externalStorageUploaded: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      pagerSent: false,
      pagerDutySent: false,
      opsgenieSent: false,
      realAuditorNotified: false,
      realStakeholderNotified: false,
      realApproverNotified: false,
      realCustomerNotified: false,
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
      realHashCalculated: false,
      xmlSigned: false,
      pdfGenerated: false,
      realEvidencePersisted: false,
      realDisclosureRecordPersisted: false,
      realAuditRecordPersisted: false,
      realLegalHoldPersisted: false,
      fileSystemWritten: false,
      databaseWritten: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realSefazCalled: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false
    });
  }

  public static getLogs() {
    return [...this.logs];
  }
}
