import { FiscalRealApprovalDmlDryRunInput, FiscalRealApprovalDmlDryRunResult, FiscalRealApprovalDmlDryRunStatus } from './FiscalRealApprovalDmlDryRunTypes';
import { FiscalRealApprovalDmlValidator } from './FiscalRealApprovalDmlValidator';

export class FiscalRealApprovalDmlPolicy {
  public static enforce(input: FiscalRealApprovalDmlDryRunInput): Partial<FiscalRealApprovalDmlDryRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalDmlValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record DML/Seed Dry-Run 17.3 é apenas simulação administrativa de seed e mutação controlada de dados. Nenhum INSERT, UPDATE, DELETE, COMMIT ou DML real foi executado. Nenhum approval record real foi persistido ou assinado. Banco real, autorização real, gate unlock real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalDmlDryRunStatus.BLOCKED_FOR_REAL_DML,
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

  public static getBaseResult(): FiscalRealApprovalDmlDryRunResult {
    return {
        success: true,
        status: FiscalRealApprovalDmlDryRunStatus.DML_SEED_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        seedPlanGenerated: true,
        insertSimulationGenerated: true,
        updateSimulationGenerated: true,
        deleteSimulationGenerated: true,
        commitPlanGenerated: true,
        mutationDiffGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record DML/Seed Dry-Run 17.3 é apenas simulação administrativa de seed e mutação controlada de dados. Nenhum INSERT, UPDATE, DELETE, COMMIT ou DML real foi executado. Nenhum approval record real foi persistido ou assinado. Banco real, autorização real, gate unlock real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        dmlSeedDryRunOnly: true,
        controlledDataMutationSimulationOnly: true,
        realDataSeeded: false,
        dmlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        realApprovalRecordCreated: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        terraformApplied: false,
        pulumiApplied: false,
        cloudFormationDeployed: false,
        infrastructureProvisioned: false,
        certificateLoaded: false,
        realSefazCalled: false,
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
        approvedForDmlSeedDryRunClosure: true,
        approvedForControlledDataMutationSimulation: true,
        approvedForRealDmlExecution: false,
        approvedForRealInsert: false,
        approvedForRealUpdate: false,
        approvedForRealDelete: false,
        approvedForRealCommit: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}
