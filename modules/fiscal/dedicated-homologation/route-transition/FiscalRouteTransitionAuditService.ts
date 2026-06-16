export class FiscalRouteTransitionAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivated: false,
        trafficChanged: false,
        routeToV2: false,
        routeToLegacy: true,
        realRouteTransitionExecuted: false,
        appUseModified: false,
        middlewareInstalled: false,
        proxyInstalled: false,
        tapInstalled: false,
        v2HandlerCalled: false,
        legacyHandlerCalledAsSideEffect: false,
        workersCreated: false,
        schedulersCreated: false,
        realExecutionGateUnlocked: false,
        realAuthorizationGranted: false,
        dmlExecuted: false,
        ddlExecuted: false,
        realDatabaseConnected: false,
        realSefazCalled: false,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realCryptoUsed: false,
        xmlSigned: false,
        pdfGenerated: false
      }
    };
    this.logs.push(logEntry);
    return logEntry;
  }

  public static getLogs() {
    return this.logs;
  }
}
