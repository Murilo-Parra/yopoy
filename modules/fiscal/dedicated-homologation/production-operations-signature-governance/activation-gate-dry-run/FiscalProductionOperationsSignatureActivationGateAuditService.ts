export class FiscalProductionOperationsSignatureActivationGateAuditService {
  private static auditLogs: any[] = [];

  public static logAdminRead(action: string, metadata?: any) {
    this.auditLogs.push({
      action,
      timestamp: new Date().toISOString(),
      metadata,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      productionV2Activated: false,
      routeToV2: false,
      trafficChanged: false,
      realSignatureCollected: false,
      realCryptographicSignatureCollected: false,
      realConsentPersisted: false,
      realSignatureRecordPersisted: false,
      realApprovalRecordPersisted: false,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      privateKeyRead: false,
      tokenRead: false,
      realSecretRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      dmlExecuted: false,
      sefazCalled: false,
      realRuntimeStarted: false
    });
  }

  public static getLogs() {
    return [...this.auditLogs];
  }
  
  public static clearLogs() {
      this.auditLogs = [];
  }
}
