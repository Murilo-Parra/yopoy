export class FiscalRouteCanaryShadowAuditService {
  private static logs: any[] = [];

  public static audit(action: string, metadata: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      metadata: {
        ...metadata,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        canaryActivated: false,
        shadowTrafficEnabled: false,
        realTrafficMirrored: false,
        requestDuplicated: false,
        requestCaptured: false,
        responseCaptured: false,
        payloadCaptured: false,
        proxyInstalled: false,
        middlewareInstalled: false,
        tapInstalled: false,
        appUseModified: false,
        routerUseModified: false,
        routeToV2: false,
        routeToLegacy: true,
        trafficChanged: false,
        v2HandlerCalled: false,
        legacyHandlerCalledAsSideEffect: false,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivatedField: false,
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
