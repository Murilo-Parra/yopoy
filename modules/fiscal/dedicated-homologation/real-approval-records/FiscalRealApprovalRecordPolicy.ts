import { FiscalRealApprovalRecordInput, FiscalRealApprovalRecordResult, FiscalRealApprovalRecordStatus } from './FiscalRealApprovalRecordTypes';
import { FiscalRealApprovalRecordValidator } from './FiscalRealApprovalRecordValidator';

export class FiscalRealApprovalRecordPolicy {
  public static enforce(input: FiscalRealApprovalRecordInput): Partial<FiscalRealApprovalRecordResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalRecordValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record Registry Blueprint 16.1 é apenas blueprint administrativo e envelope de assinatura não executável. Nenhum approval record real foi criado, persistido ou assinado. Nenhuma autorização real foi concedida. Gate unlock real, execução real, Terraform apply, Pulumi up, deploy real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalRecordStatus.BLOCKED_FOR_REAL_APPROVAL_RECORD,
        validationExecuted: true,
        evaluationExecuted: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: validation.warnings
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalRealApprovalRecordResult {
    return {
        success: true,
        status: FiscalRealApprovalRecordStatus.APPROVAL_RECORD_BLUEPRINT_READY,
        blueprintGenerated: true,
        schemaPlanGenerated: true,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        nonExecutableSignatureEnvelopeGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record Registry Blueprint 16.1 é apenas blueprint administrativo e envelope de assinatura não executável. Nenhum approval record real foi criado, persistido ou assinado. Nenhuma autorização real foi concedida. Gate unlock real, execução real, Terraform apply, etc. permanecem bloqueados.'],
        warnings: [],
        approvalRecordBlueprintOnly: true,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        approvalRecordExecutable: false,
        signatureEnvelopeExecutable: false,
        signatureEnvelopeSigned: false,
        signatureEnvelopePersisted: false,
        realApprovalRecordCreated: false,
        realApprovalGranted: false,
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
        nonExecutableSignatureEnvelopeOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForApprovalRecordBlueprintClosure: true,
        approvedForNonExecutableSignatureEnvelope: true,
        approvedForRealApprovalRecordCreation: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
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
