import { FiscalRealDualApprovalInput, FiscalRealDualApprovalStatus, FiscalRealDualApprovalResult } from './FiscalRealDualApprovalTypes';
import { FiscalRealDualApprovalValidator } from './FiscalRealDualApprovalValidator';
import { FiscalRealSegregationOfDutiesReview } from './FiscalRealSegregationOfDutiesReview';

export class FiscalRealDualApprovalPolicy {
  public static enforce(input: FiscalRealDualApprovalInput): Partial<FiscalRealDualApprovalResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealDualApprovalValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    if (input.forceCompleteDualApproval) blockers.push('forceCompleteDualApproval is blocked.');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization is blocked.');
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

    const sodResult = FiscalRealSegregationOfDutiesReview.review(input);
    if (!sodResult.segregationOfDutiesPassed) {
       blockers.push(...sodResult.warnings);
    }

    blockers.push('Real Dual Approval Simulation 15.2 é apenas simulação administrativa e revisão de segregação de funções. Nenhuma dupla aprovação real foi concluída e nenhuma autorização real foi concedida. Gate unlock real, autorização real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0 || !sodResult.segregationOfDutiesPassed) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealDualApprovalStatus.BLOCKED_FOR_REAL_APPROVAL,
        validationExecuted: true,
        simulationExecuted: false,
        evaluationExecuted: false,
        decisionSimulated: false,
        sodReviewed: true,
        segregationOfDutiesPassed: false,
        go: false,
        noGo: true,
        blockers,
        warnings: validation.warnings
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalRealDualApprovalResult {
    return {
        success: true,
        status: FiscalRealDualApprovalStatus.DUAL_APPROVAL_SIMULATION_READY,
        validationExecuted: true,
        simulationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        sodReviewed: true,
        go: false,
        noGo: true,
        blockers: ['Real Dual Approval Simulation 15.2 é apenas simulação administrativa e revisão de segregação de funções. Nenhuma dupla aprovação real foi concluída e nenhuma autorização real foi concedida. Gate unlock real, autorização real, execution real, Terraform apply, etc. permanecem bloqueados.'],
        warnings: [],
        dualApprovalSimulated: true,
        dualApprovalCompleted: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        approvalRecordPersisted: false,
        approverANotifiedExternally: false,
        approverBNotifiedExternally: false,
        sameUserApprovalBlocked: true,
        segregationOfDutiesPassed: true,
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
        dualApprovalSimulationOnly: true,
        segregationOfDutiesReviewOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForDualApprovalSimulationClosure: true,
        approvedForRealDualApprovalCompletion: false,
        approvedForRealAuthorizationGrant: false,
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
