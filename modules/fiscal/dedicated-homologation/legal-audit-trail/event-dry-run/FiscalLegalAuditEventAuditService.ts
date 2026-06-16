export class FiscalLegalAuditEventAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        legalAuditEventPersisted: false,
        dmlExecuted: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
