export class FiscalProductionRuntimeExecutionGraphAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        realTransactionOpened: false,
        realTransactionCommitted: false,
        realTransactionRolledBack: false,
        realDatabaseConnected: false,
        dmlExecuted: false,
        ddlExecuted: false,
        realSefazCalled: false,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realCryptoUsed: false,
        xmlSigned: false,
        pdfGenerated: false,
        runtimeGraphExecuted: false,
        runtimeExecutionStarted: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
