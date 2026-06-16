export class FiscalRealApprovalSignatureAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        realSignatureApplied: false,
        realAuthorizationGranted: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
