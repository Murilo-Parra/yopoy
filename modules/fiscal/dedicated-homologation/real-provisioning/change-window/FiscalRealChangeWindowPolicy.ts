import { FiscalRealChangeWindowStatus, FiscalRealChangeWindowInput, FiscalRealChangeWindowResult } from './FiscalRealChangeWindowTypes';

export class FiscalRealChangeWindowPolicy {
  public static enforce(input: any): Partial<FiscalRealChangeWindowResult> | null {
    const blockers: string[] = [];

    if (input.forceOpenRealChangeWindow) blockers.push('forceOpenRealChangeWindow true is administratively blocked.');
    if (input.forceStartExecution) blockers.push('forceStartExecution true is administratively blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply true is administratively blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp true is administratively blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy true is administratively blocked.');
    if (input.forceCreateRealDatabase) blockers.push('forceCreateRealDatabase true is administratively blocked.');
    if (input.forceCreateRealVault) blockers.push('forceCreateRealVault true is administratively blocked.');
    if (input.forceWriteRealSecret) blockers.push('forceWriteRealSecret true is administratively blocked.');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate true is administratively blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz true is administratively blocked.');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml true is administratively blocked.');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf true is administratively blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 true is administratively blocked.');

    blockers.push(this.getMandatoryMessage());

    if (blockers.length > 1) { // Contains custom blocks
      return {
        success: false,
        status: FiscalRealChangeWindowStatus.BLOCKED_FOR_REAL_EXECUTION,
        evaluationExecuted: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: [],
        realChangeWindowOpened: false,
        realExecutionStarted: false,
        iacApplyApproved: false,
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
        changeWindowPlanningOnly: true,
        executionReadinessOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForChangeWindowClosure: true,
        approvedForRealChangeWindow: false,
        approvedForExecutionStart: false,
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
    return 'Real Provisioning Change Window 12.4 é planejamento administrativo de janela e prontidão. Abertura de janela real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.';
  }

  public static getBaseResult(): FiscalRealChangeWindowResult {
    return {
        success: true,
        status: FiscalRealChangeWindowStatus.CHANGE_WINDOW_PLAN_READY,
        evaluationExecuted: true,
        decisionSimulated: true,
        go: false,
        noGo: true,
        blockers: [this.getMandatoryMessage()],
        warnings: [],
        realChangeWindowOpened: false,
        realExecutionStarted: false,
        iacApplyApproved: false,
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
        changeWindowPlanningOnly: true,
        executionReadinessOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForChangeWindowClosure: true,
        approvedForRealChangeWindow: false,
        approvedForExecutionStart: false,
        approvedForIacApply: false,
        approvedForInfrastructureProvisioning: false,
        approvedForEnvironmentActivation: false,
        approvedForRealHomologation: false,
        approvedForSefazConnection: false,
        approvedForCertificateLoad: false,
        approvedForXmlSigning: false,
        approvedForPdfGeneration: false,
        approvedForProductionV2: false
    } as FiscalRealChangeWindowResult; // Casting correctly
  }
}

