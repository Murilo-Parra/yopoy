import { FiscalRealAuthorizationRequestInput, FiscalRealAuthorizationStatus, FiscalRealAuthorizationResult } from './FiscalRealAuthorizationRequestTypes';
import { FiscalRealAuthorizationRequestValidator } from './FiscalRealAuthorizationRequestValidator';

export class FiscalRealAuthorizationPolicy {
  public static enforce(input: FiscalRealAuthorizationRequestInput): Partial<FiscalRealAuthorizationResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealAuthorizationRequestValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

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

    blockers.push('Real Authorization Request Intake 15.1 é apenas intake administrativo e envelope de aprovação não executável. Nenhuma autorização real foi concedida. Gate unlock real, autorização real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealAuthorizationStatus.BLOCKED_FOR_REAL_AUTHORIZATION,
        evaluationExecuted: false,
        nonExecutableEnvelopeGenerated: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: validation.warnings
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalRealAuthorizationResult {
    return {
        success: true,
        status: FiscalRealAuthorizationStatus.NON_EXECUTABLE_APPROVAL_ENVELOPE_READY,
        intakeAccepted: true,
        requestValidated: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        nonExecutableEnvelopeGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Real Authorization Request Intake 15.1 é apenas intake administrativo e envelope de aprovação não executável. Nenhuma autorização real foi concedida. Gate unlock real, autorização real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        authorizationRequestPersisted: false,
        authorizationEnvelopeExecutable: false,
        authorizationEnvelopeSigned: false,
        authorizationEnvelopePersisted: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
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
        authorizationRequestIntakeOnly: true,
        nonExecutableApprovalEnvelopeOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForAuthorizationRequestIntake: true,
        approvedForNonExecutableEnvelope: true,
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
