export class FiscalProductionDualRunAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        dualRunExecuted: false,
        realTrafficDuplicated: false,
        realRequestCaptured: false,
        realResponseCaptured: false,
        productionV2Activated: false,
        v2HandlerCalled: false,
        appUseModified: false,
        middlewareInstalled: false,
        tapInstalled: false,
        workersCreated: false,
        schedulersCreated: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
