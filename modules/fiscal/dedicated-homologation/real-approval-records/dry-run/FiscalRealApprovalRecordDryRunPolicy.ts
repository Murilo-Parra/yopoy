import { FiscalRealApprovalRecordDryRunInput, FiscalRealApprovalRecordDryRunResult, FiscalRealApprovalRecordDryRunStatus } from './FiscalRealApprovalRecordDryRunTypes';
import { FiscalRealApprovalRecordIntegrityValidator } from './FiscalRealApprovalRecordIntegrityValidator';

export class FiscalRealApprovalRecordDryRunPolicy {
  public static enforce(input: FiscalRealApprovalRecordDryRunInput): Partial<FiscalRealApprovalRecordDryRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalRecordIntegrityValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record Dry-Run Persistence 16.2 é apenas simulação administrativa de persistência e trilha de auditoria. Nenhum approval record real foi criado, persistido, assinado ou confirmado. Nenhum DDL, DML, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Autorização real, gate unlock real, execução real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalRecordDryRunStatus.BLOCKED_FOR_REAL_PERSISTENCE,
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

  public static getBaseResult(): FiscalRealApprovalRecordDryRunResult {
    return {
        success: true,
        status: FiscalRealApprovalRecordDryRunStatus.DRY_RUN_PERSISTENCE_READY,
        validationExecuted: true,
        dryRunPersistenceSimulated: true,
        auditTrailSimulated: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record Dry-Run Persistence 16.2 é apenas simulação administrativa de persistência e trilha de auditoria. Nenhum approval record real foi criado, persistido, assinado ou confirmado. Nenhum DDL, DML, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Autorização real, gate unlock real, execução real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        dryRunPersistenceOnly: true,
        auditTrailSimulationOnly: true,
        approvalRecordDryRunStored: true,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        approvalRecordExecutable: false,
        realApprovalRecordCreated: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        dmlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realExecutionStarted: false,
        iacApplied: false,
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
        approvedForDryRunPersistenceSimulation: true,
        approvedForAuditTrailSimulation: true,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
        approvedForIacApply: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}
