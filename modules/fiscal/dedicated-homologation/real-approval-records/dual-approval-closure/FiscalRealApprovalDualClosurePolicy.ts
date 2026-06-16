import { FiscalRealApprovalDualClosureInput, FiscalRealApprovalDualClosureResult, FiscalRealApprovalDualClosureStatus } from './FiscalRealApprovalDualClosureTypes';
import { FiscalRealApprovalDualClosureValidator } from './FiscalRealApprovalDualClosureValidator';

export class FiscalRealApprovalDualClosurePolicy {
  public static enforce(input: FiscalRealApprovalDualClosureInput): Partial<FiscalRealApprovalDualClosureResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalDualClosureValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record Dual Approval Closure 17.5 é apenas simulação administrativa de conclusão de dupla aprovação e fechamento documental de governança. Nenhum dual approval real foi concluído, nenhum approval record real foi persistido ou assinado, nenhuma autorização real foi concedida, nenhum endpoint externo real foi chamado, nenhum DML/DDL real foi executado, SEFAZ real, XML/PDF real, Produção V2 e tráfego produtivo permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalDualClosureStatus.BLOCKED_FOR_REAL_DUAL_APPROVAL,
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

  public static getBaseResult(): FiscalRealApprovalDualClosureResult {
    return {
        success: true,
        status: FiscalRealApprovalDualClosureStatus.DUAL_APPROVAL_CONCLUSION_SIMULATION_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        dualConclusionSimulated: true,
        sodReviewExecuted: true,
        governanceClosureInventoryGenerated: true,
        finalChecklistGenerated: true,
        evidencePackageGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record Dual Approval Closure 17.5 é apenas simulação administrativa de conclusão de dupla aprovação e fechamento documental de governança. Nenhum dual approval real foi concluído, nenhum approval record real foi persistido ou assinado, nenhuma autorização real foi concedida, nenhum endpoint externo real foi chamado, nenhum DML/DDL real foi executado, SEFAZ real, XML/PDF real, Produção V2 e tráfego produtivo permanecem bloqueados.'],
        warnings: [],
        dualApprovalConclusionSimulationOnly: true,
        approvalRecordGovernanceClosureOnly: true,
        dualApprovalCompleted: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        realApprovalRecordCreated: false,
        realSignatureApplied: false,
        externalApproverNotified: false,
        externalEndpointCalled: false,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        dmlExecuted: false,
        ddlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        infrastructureProvisioned: false,
        realSefazCalled: false,
        endpointCalled: false,
        xmlSigned: false,
        pdfGenerated: false,
        productionV2Activated: false,
        trafficChanged: false,
        workersCreated: false,
        schedulersCreated: false,
        readOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForDualApprovalConclusionSimulation: true,
        approvedForApprovalRecordGovernanceClosure: true,
        approvedForRealDualApprovalCompletion: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}
