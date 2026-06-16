export class FiscalProductionReleaseGatewayAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        releaseActivated: false,
        productionV2Activated: false,
        canaryActivated: false,
        trafficChanged: false,
        routeToV2: false,
        v2HandlerCalled: false,
        appUseModified: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
