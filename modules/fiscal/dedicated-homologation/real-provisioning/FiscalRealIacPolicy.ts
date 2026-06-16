import { FiscalRealProvisioningIacDomain, FiscalRealProvisioningIacEvaluationResult, FiscalRealProvisioningIacStatus } from './FiscalRealProvisioningIacTypes';

export class FiscalRealIacPolicy {
  public static enforce(input: any): Partial<FiscalRealProvisioningIacEvaluationResult> | null {
    const blockers: string[] = [];

    if (input.forceTerraformApply) blockers.push('forceTerraformApply true is administratively blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp true is administratively blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy true is administratively blocked.');
    if (input.forceCreateRealResource) blockers.push('forceCreateRealResource true is administratively blocked.');
    if (input.forceCreateRealDatabase) blockers.push('forceCreateRealDatabase true is administratively blocked.');
    if (input.forceCreateRealVault) blockers.push('forceCreateRealVault true is administratively blocked.');
    if (input.forceWriteRealSecret) blockers.push('forceWriteRealSecret true is administratively blocked.');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate true is administratively blocked.');
    if (input.forceReadRealPfx) blockers.push('forceReadRealPfx true is administratively blocked.');
    if (input.forceReadCertificatePassword) blockers.push('forceReadCertificatePassword true is administratively blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz true is administratively blocked.');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml true is administratively blocked.');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf true is administratively blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 true is administratively blocked.');

    blockers.push(this.getMandatoryMessage());

    if (blockers.length > 1) { // More than just the mandatory message
      return {
        success: false,
        status: FiscalRealProvisioningIacStatus.BLOCKED_FOR_REAL_APPLY,
        evaluationExecuted: false,
        go: false,
        noGo: true,
        blockers,
        warnings: [],
        iacApplied: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        realResourceCreated: false,
        infrastructureProvisioned: false,
        environmentActivated: false,
        networkApplied: false,
        databaseProvisioned: false,
        realDatabaseConnected: false,
        vaultProvisioned: false,
        secretWritten: false,
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
        iacPlanOnly: true,
        secretVaultDryRunOnly: true,
        infrastructureContractOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForIacPlanClosure: true,
        approvedForIacApply: false,
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
    return 'Real Provisioning IaC 12.2 é plano administrativo dry-run. Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(): FiscalRealProvisioningIacEvaluationResult {
    return {
      success: true,
      status: FiscalRealProvisioningIacStatus.IAC_PLAN_READY,
      evaluationExecuted: true,
      go: false,
      noGo: true,
      blockers: [this.getMandatoryMessage()],
      warnings: [],
      iacApplied: false,
      terraformApplied: false,
      pulumiApplied: false,
      cloudFormationDeployed: false,
      realResourceCreated: false,
      infrastructureProvisioned: false,
      environmentActivated: false,
      networkApplied: false,
      databaseProvisioned: false,
      realDatabaseConnected: false,
      vaultProvisioned: false,
      secretWritten: false,
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
      iacPlanOnly: true,
      secretVaultDryRunOnly: true,
      infrastructureContractOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForIacPlanClosure: true,
      approvedForIacApply: false,
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
