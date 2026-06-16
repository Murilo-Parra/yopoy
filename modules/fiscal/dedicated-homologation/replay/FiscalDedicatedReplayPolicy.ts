import { FiscalDedicatedReplayResult, FiscalDedicatedReplayDomain, FiscalDedicatedReplayStatus } from './FiscalDedicatedReplayTypes';

export class FiscalDedicatedReplayPolicy {
  public static enforce(input: any): Partial<FiscalDedicatedReplayResult> | null {
    const blockers: string[] = [];

    if (input.forceRealTraffic) blockers.push('forceRealTraffic true is administratively blocked.');
    if (input.forceEndpointCall) blockers.push('forceEndpointCall true is administratively blocked.');
    if (input.forceLegacyHandlerCall) blockers.push('forceLegacyHandlerCall true is administratively blocked.');
    if (input.forceV2HandlerCall) blockers.push('forceV2HandlerCall true is administratively blocked.');
    if (input.forceSefazCall) blockers.push('forceSefazCall true is administratively blocked.');
    if (input.forceCertificateLoad) blockers.push('forceCertificateLoad true is administratively blocked.');
    if (input.forceXmlSigning) blockers.push('forceXmlSigning true is administratively blocked.');
    if (input.forcePdfGeneration) blockers.push('forcePdfGeneration true is administratively blocked.');
    if (input.forceWorkerCreation) blockers.push('forceWorkerCreation true is administratively blocked.');

    blockers.push(this.getMandatoryMessage());

    if (blockers.length > 1) { // More than just the mandatory message
      return {
        success: false,
        status: FiscalDedicatedReplayStatus.BLOCKED_FOR_REAL_REPLAY,
        domain: input.domain || FiscalDedicatedReplayDomain.FULL_STACK,
        replayExecuted: false,
        queued: false,
        processedManually: false,
        blockers,
        warnings: [],
        syntheticOnly: true,
        realTrafficCaptured: false,
        realTrafficProcessed: false,
        endpointCalled: false,
        legacyHandlerCalled: false,
        v2HandlerCalled: false,
        environmentActivated: false,
        infrastructureProvisioned: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretLoaded: false,
        certificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realSefazCalled: false,
        xmlSigned: false,
        realXmlSigned: false,
        pdfGenerated: false,
        realPdfGenerated: false,
        observabilityActivated: false,
        rollbackInstalled: false,
        killSwitchInstalled: false,
        circuitBreakerInstalled: false,
        releaseActivated: false,
        canaryActivated: false,
        productionV2Activated: false,
        trafficChanged: false,
        workersCreated: false,
        schedulersCreated: false,
        readOnly: true,
        replayHarnessOnly: true,
        syntheticReplayOnly: true,
        mockEnvironmentOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForInfrastructureProvisioning: false,
        approvedForEnvironmentActivation: false,
        approvedForRealHomologation: false,
        approvedForSefazConnection: false,
        approvedForCertificateLoad: false,
        approvedForXmlSigning: false,
        approvedForPdfGeneration: false,
        approvedForProductionV2: false
      };
    }
    return null;
  }

  public static getMandatoryMessage() {
    return 'Dedicated Homologation Replay 11.4 é harness administrativo sintético. Replay real, tráfego real, endpoint real, handler real, certificado real, SEFAZ real, XML real assinado, PDF real, workers e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(domain: FiscalDedicatedReplayDomain | string): FiscalDedicatedReplayResult {
    return {
      success: true,
      status: FiscalDedicatedReplayStatus.SYNTHETIC_REPLAY_READY,
      domain,
      replayExecuted: false,
      queued: false,
      processedManually: false,
      blockers: [this.getMandatoryMessage()],
      warnings: [],
      syntheticOnly: true,
      realTrafficCaptured: false,
      realTrafficProcessed: false,
      endpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      environmentActivated: false,
      infrastructureProvisioned: false,
      databaseProvisioned: false,
      realDatabaseConnected: false,
      vaultProvisioned: false,
      secretLoaded: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realSefazCalled: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      observabilityActivated: false,
      rollbackInstalled: false,
      killSwitchInstalled: false,
      circuitBreakerInstalled: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      workersCreated: false,
      schedulersCreated: false,
      readOnly: true,
      replayHarnessOnly: true,
      syntheticReplayOnly: true,
      mockEnvironmentOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    };
  }
}
