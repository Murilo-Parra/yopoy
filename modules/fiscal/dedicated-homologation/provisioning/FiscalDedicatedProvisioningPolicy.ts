import { FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';

export class FiscalDedicatedProvisioningPolicy {
  public static enforce(input: any): Partial<FiscalDedicatedProvisioningValidationResult> | null {
    const blockers: string[] = [];

    if (input.forceProvision) blockers.push('forceProvision true is administratively blocked.');
    if (input.forceCreateDatabase) blockers.push('forceCreateDatabase true is administratively blocked.');
    if (input.forceCreateVault) blockers.push('forceCreateVault true is administratively blocked.');
    if (input.forceLoadCertificate) blockers.push('forceLoadCertificate true is administratively blocked.');
    if (input.forceSefazCall) blockers.push('forceSefazCall true is administratively blocked.');
    if (input.forceXmlSigning) blockers.push('forceXmlSigning true is administratively blocked.');
    if (input.forcePdfGeneration) blockers.push('forcePdfGeneration true is administratively blocked.');

    const strPlan = JSON.stringify(input.proposedPlan || {});
    // Validator bloqueia payload bruto / password / token / etc em claro.
    if (strPlan.match(/password|token|privateKey|pfx|certificate/i) && strPlan.length > 50) {
      blockers.push('Proposed plan contains sensitive data in clear text.');
    }
    if (strPlan.length > 10000) {
      blockers.push('Proposed plan is too large (giant string blocked).');
    }

    blockers.push('Dedicated Homologation Provisioning 11.2 é validação administrativa dry-run. Provisionamento real, banco real, vault real, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1) { // 1 is just the mandatory message
      return {
        success: false,
        status: FiscalDedicatedProvisioningStatus.BLOCKED_FOR_REAL_PROVISIONING,
        domain: input.domain || FiscalDedicatedProvisioningDomain.FULL_STACK,
        validationPassed: false,
        blockers,
        warnings: [],
        infrastructureProvisioned: false,
        networkApplied: false,
        databaseProvisioned: false,
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
        provisioningPlanOnly: true,
        dryRunValidatorOnly: true,
        contractValidationOnly: true,
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
    return 'Dedicated Homologation Provisioning 11.2 é validação administrativa dry-run. Provisionamento real, banco real, vault real, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(domain: FiscalDedicatedProvisioningDomain | string): FiscalDedicatedProvisioningValidationResult {
      return {
        success: true,
        status: FiscalDedicatedProvisioningStatus.CONTRACT_VALIDATION_READY,
        domain,
        validationPassed: true,
        blockers: [this.getMandatoryMessage()],
        warnings: [],
        infrastructureProvisioned: false,
        networkApplied: false,
        databaseProvisioned: false,
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
        provisioningPlanOnly: true,
        dryRunValidatorOnly: true,
        contractValidationOnly: true,
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
