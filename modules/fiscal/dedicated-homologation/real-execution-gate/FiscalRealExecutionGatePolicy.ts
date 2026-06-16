import { FiscalRealExecutionGateInput, FiscalRealExecutionGateResult, FiscalRealExecutionGateStatus } from './FiscalRealExecutionGateTypes';

export class FiscalRealExecutionGatePolicy {
  public static enforce(input: any): Partial<FiscalRealExecutionGateResult> | null {
    const blockers: string[] = [];

    if (input.forceUnlockGate) blockers.push('forceUnlockGate true is blocked.');
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

    blockers.push('O Módulo 13.1 criou apenas o Controlled Real Provisioning Execution Gate em modo read-only/execution-gate-only/pre-execution-lock-only/governance-only/simulation-only. O gate permanece bloqueado. Autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, infraestrutura real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.');

    if (blockers.length > 1) {
      const result = this.getBaseResult();
      result.success = false;
      result.status = FiscalRealExecutionGateStatus.BLOCKED_FOR_GATE_UNLOCK;
      result.evaluationExecuted = false;
      result.unlockSimulated = false;
      result.go = false;
      result.noGo = true;
      result.blockers = blockers;
      return result;
    }

    return null;
  }

  public static getBaseResult(): FiscalRealExecutionGateResult {
    return {
        success: true,
        status: FiscalRealExecutionGateStatus.PRE_EXECUTION_EVALUATION_READY,
        evaluationExecuted: true,
        unlockSimulated: true,
        go: false,
        noGo: true,
        blockers: ['O Módulo 13.1 criou apenas o Controlled Real Provisioning Execution Gate em modo read-only/execution-gate-only/pre-execution-lock-only/governance-only/simulation-only. O gate permanece bloqueado. Autorização real, abertura real de janela, execução real, Terraform apply, Pulumi up, deploy real, infraestrutura real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'],
        warnings: [],
        realExecutionGateCreated: true,
        realExecutionGateUnlocked: false,
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
        executionGateOnly: true,
        preExecutionLockOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForExecutionGateClosure: true,
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
