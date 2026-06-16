import { FiscalRealAuthorizationPayloadInput, FiscalRealActionPlanResult, FiscalRealActionPlanStatus } from './FiscalRealExecutionActionPlanTypes';

export class FiscalRealActionPlanPolicy {
  public static enforce(input: FiscalRealAuthorizationPayloadInput): Partial<FiscalRealActionPlanResult> | null {
    const blockers: string[] = [];

    if (input.forceUnlockGate) blockers.push('forceUnlockGate is blocked.');
    if (input.forceAuthorizeRealExecution) blockers.push('forceAuthorizeRealExecution is blocked.');
    if (input.forceStartExecution) blockers.push('forceStartExecution is blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply is blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp is blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy is blocked.');
    if (input.forceCreateRealDatabase) blockers.push('forceCreateRealDatabase is blocked.');
    if (input.forceCreateRealVault) blockers.push('forceCreateRealVault is blocked.');
    if (input.forceWriteRealSecret) blockers.push('forceWriteRealSecret is blocked.');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate is blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz is blocked.');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml is blocked.');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf is blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 is blocked.');

    blockers.push('Real Execution Action Plan 13.3 é payload administrativo e plano de ação bloqueado. O payload não é executável, não é assinado, não é persistido, e não autoriza execução real. Gate unlock real, autorização real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1) {
      const result = this.getBaseResult();
      return {
        ...result,
        success: false,
        status: FiscalRealActionPlanStatus.BLOCKED_FOR_REAL_EXECUTION,
        evaluationExecuted: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalRealActionPlanResult {
    return {
        success: true,
        status: FiscalRealActionPlanStatus.LOCKED_ACTION_PLAN_READY,
        evaluationExecuted: true,
        decisionSimulated: true,
        go: false,
        noGo: true,
        blockers: ['Real Execution Action Plan 13.3 é payload administrativo e plano de ação bloqueado. O payload não é executável, não é assinado, não é persistido, e não autoriza execução real. Gate unlock real, autorização real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        authorizationPayloadBuilt: true,
        lockedActionPlanGenerated: true,
        payloadExecutable: false,
        payloadSigned: false,
        payloadPersisted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
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
        authorizationPayloadOnly: true,
        lockedActionPlanOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForActionPlanClosure: true,
        approvedForGateUnlock: false,
        approvedForRealExecutionAuthorization: false,
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
