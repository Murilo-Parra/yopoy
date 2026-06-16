import { FiscalRealUnlockInput, FiscalRealUnlockResult, FiscalRealUnlockStatus } from './FiscalRealUnlockSimulationTypes';

export class FiscalRealUnlockPolicy {
  public static enforce(input: FiscalRealUnlockInput): Partial<FiscalRealUnlockResult> | null {
    const blockers: string[] = [];

    if (input.forceUnlockGate) blockers.push('forceUnlockGate true is blocked.');
    if (input.forceBypassDualApproval) blockers.push('forceBypassDualApproval true is blocked.');
    if (input.forceAuthorizeRealExecution) blockers.push('forceAuthorizeRealExecution true is blocked.');
    if (input.forceOpenRealChangeWindow) blockers.push('forceOpenRealChangeWindow true is blocked.');
    if (input.forceStartExecution) blockers.push('forceStartExecution true is blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply true is blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp true is blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy true is blocked.');
    if (input.forceCreateRealDatabase) blockers.push('forceCreateRealDatabase true is blocked.');
    if (input.forceCreateRealVault) blockers.push('forceCreateRealVault true is blocked.');
    if (input.forceWriteRealSecret) blockers.push('forceWriteRealSecret true is blocked.');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate true is blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz true is blocked.');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml true is blocked.');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf true is blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 true is blocked.');

    blockers.push('Real Execution Gate Unlock 13.2 é simulação administrativa de dupla aprovação. Destravamento real do gate, autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealUnlockStatus.BLOCKED_FOR_REAL_UNLOCK,
        evaluationExecuted: false,
        dualApprovalSimulated: false,
        go: false,
        noGo: true,
        blockers
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalRealUnlockResult {
    return {
        success: true,
        status: FiscalRealUnlockStatus.UNLOCK_SIMULATION_READY,
        evaluationExecuted: true,
        dualApprovalSimulated: true,
        go: false,
        noGo: true,
        blockers: ['Real Execution Gate Unlock 13.2 é simulação administrativa de dupla aprovação. Destravamento real do gate, autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        realExecutionGateUnlocked: false,
        primaryApprovalSimulated: true,
        secondaryApprovalSimulated: true,
        dualApprovalSatisfiedForSimulation: true,
        dualApprovalSatisfiedForRealUnlock: false,
        realExecutionAuthorized: false,
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
        releaseActivated: false,
        canaryActivated: false,
        productionV2Activated: false,
        trafficChanged: false,
        workersCreated: false,
        schedulersCreated: false,
        readOnly: true,
        unlockSimulationOnly: true,
        dualApprovalGateOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForUnlockSimulationClosure: true,
        approvedForGateUnlock: false,
        approvedForRealExecutionAuthorization: false,
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
}
