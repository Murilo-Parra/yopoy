export class FiscalProductionCanaryRampAuditService {
  private static auditLogs: any[] = [];

  public static logAdminRead(action: string, metadata?: any) {
    this.auditLogs.push({
      action,
      timestamp: new Date().toISOString(),
      metadata,
      realCanaryActivated: false,
      realTrafficPromoted: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      mirrorInstalled: false,
      snifferInstalled: false,
      realRequestCaptured: false,
      realResponseCaptured: false,
      realPayloadCaptured: false,
      realRequestDuplicated: false,
      realCutoverExecuted: false,
      realGoLiveExecuted: false,
      realRolloutExecuted: false,
      realRollbackExecuted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      realAuthorizationGranted: false,
      runtimeExecutionStarted: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      sefazCalled: false,
      realCertificateRead: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      privateKeyRead: false,
      tokenRead: false,
      realSecretRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
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
    return [...this.auditLogs];
  }

  public static clearLogs() {
    this.auditLogs = [];
  }
}
