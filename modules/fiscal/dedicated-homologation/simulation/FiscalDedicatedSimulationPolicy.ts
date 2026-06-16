import { FiscalDedicatedSimulationResult, FiscalDedicatedSimulationDomain, FiscalDedicatedSimulationStatus } from './FiscalDedicatedSimulationTypes';

export class FiscalDedicatedSimulationPolicy {
  public static enforce(input: any): Partial<FiscalDedicatedSimulationResult> | null {
    const blockers: string[] = [];

    if (input.forceRealRuntime) blockers.push('forceRealRuntime true is administratively blocked.');
    if (input.forceRealDatabase) blockers.push('forceRealDatabase true is administratively blocked.');
    if (input.forceRealVault) blockers.push('forceRealVault true is administratively blocked.');
    if (input.forceRealCertificate) blockers.push('forceRealCertificate true is administratively blocked.');
    if (input.forceSefazCall) blockers.push('forceSefazCall true is administratively blocked.');
    if (input.forceXmlSigning) blockers.push('forceXmlSigning true is administratively blocked.');
    if (input.forcePdfGeneration) blockers.push('forcePdfGeneration true is administratively blocked.');
    if (input.forceWorkerCreation) blockers.push('forceWorkerCreation true is administratively blocked.');

    const strInput = JSON.stringify(input || {});
    // Validator bloqueia payload bruto / password / token / etc em claro.
    if (strInput.match(/password|token|privateKey|pfx|certificate/i) && strInput.length > 50) {
      blockers.push('Input contains sensitive data in clear text.');
    }
    if (strInput.length > 10000) {
      blockers.push('Input is too large (giant string blocked).');
    }

    blockers.push('Dedicated Homologation Simulation 11.3 é harness administrativo mockado. Runtime real, banco real, vault real, certificado real, SEFAZ real, XML real assinado, PDF real, workers e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1) { // 1 is just the mandatory message
      return {
        success: false,
        status: FiscalDedicatedSimulationStatus.BLOCKED_FOR_REAL_ENVIRONMENT,
        domain: input.domain || FiscalDedicatedSimulationDomain.FULL_STACK,
        simulationExecuted: false,
        blockers,
        warnings: [],
        environmentActivated: false,
        infrastructureProvisioned: false,
        networkApplied: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretLoaded: false,
        certificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realSefazCalled: false,
        endpointCalled: false,
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
        simulationHarnessOnly: true,
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
    return 'Dedicated Homologation Simulation 11.3 é harness administrativo mockado. Runtime real, banco real, vault real, certificado real, SEFAZ real, XML real assinado, PDF real, workers e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(domain: FiscalDedicatedSimulationDomain | string): FiscalDedicatedSimulationResult {
      return {
        success: true,
        status: FiscalDedicatedSimulationStatus.MOCK_ENVIRONMENT_READY,
        domain,
        simulationExecuted: true,
        blockers: [this.getMandatoryMessage()],
        warnings: [],
        environmentActivated: false,
        infrastructureProvisioned: false,
        networkApplied: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretLoaded: false,
        certificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        realSefazCalled: false,
        endpointCalled: false,
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
        simulationHarnessOnly: true,
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
