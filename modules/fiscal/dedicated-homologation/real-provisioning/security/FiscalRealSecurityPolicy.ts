import { FiscalRealProvisioningSecurityResult, FiscalRealProvisioningSecurityStatus } from './FiscalRealProvisioningSecurityTypes';

export class FiscalRealSecurityPolicy {
  public static enforce(input: any): Partial<FiscalRealProvisioningSecurityResult> | null {
    const blockers: string[] = [];

    if (input.forceApproveIacApply) blockers.push('forceApproveIacApply true is administratively blocked.');
    if (input.forceApproveInfrastructureProvisioning) blockers.push('forceApproveInfrastructureProvisioning true is administratively blocked.');
    if (input.forceApproveRealDatabase) blockers.push('forceApproveRealDatabase true is administratively blocked.');
    if (input.forceApproveRealVault) blockers.push('forceApproveRealVault true is administratively blocked.');
    if (input.forceApproveSecretWrite) blockers.push('forceApproveSecretWrite true is administratively blocked.');
    if (input.forceApproveCertificateLoad) blockers.push('forceApproveCertificateLoad true is administratively blocked.');
    if (input.forceApproveRealSefaz) blockers.push('forceApproveRealSefaz true is administratively blocked.');
    if (input.forceApproveXmlSigning) blockers.push('forceApproveXmlSigning true is administratively blocked.');
    if (input.forceApprovePdfGeneration) blockers.push('forceApprovePdfGeneration true is administratively blocked.');
    if (input.forceApproveProductionV2) blockers.push('forceApproveProductionV2 true is administratively blocked.');

    blockers.push(this.getMandatoryMessage());

    if (blockers.length > 1) { // More than just the mandatory message
      return {
        success: false,
        status: FiscalRealProvisioningSecurityStatus.BLOCKED_FOR_REAL_APPROVAL,
        evaluationExecuted: false,
        approvalSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: [],
        iacApplyApproved: false,
        infrastructureProvisioningApproved: false,
        realEnvironmentApproved: false,
        realDatabaseApproved: false,
        realVaultApproved: false,
        realSecretWriteApproved: false,
        realCertificateLoadApproved: false,
        realSefazApproved: false,
        realXmlSigningApproved: false,
        realPdfGenerationApproved: false,
        productionV2Approved: false,
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
        securityReviewOnly: true,
        approvalWorkflowOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForSecurityReviewClosure: true,
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
    return 'Real Provisioning Security Review 12.3 é fluxo administrativo de aprovação simulada. Aprovação real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(): FiscalRealProvisioningSecurityResult {
    return {
        success: true,
        status: FiscalRealProvisioningSecurityStatus.APPROVAL_WORKFLOW_READY,
        evaluationExecuted: true,
        approvalSimulated: true,
        go: false,
        noGo: true,
        blockers: [this.getMandatoryMessage()],
        warnings: [],
        iacApplyApproved: false,
        infrastructureProvisioningApproved: false,
        realEnvironmentApproved: false,
        realDatabaseApproved: false,
        realVaultApproved: false,
        realSecretWriteApproved: false,
        realCertificateLoadApproved: false,
        realSefazApproved: false,
        realXmlSigningApproved: false,
        realPdfGenerationApproved: false,
        productionV2Approved: false,
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
        securityReviewOnly: true,
        approvalWorkflowOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForSecurityReviewClosure: true,
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
