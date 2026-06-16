import { FiscalRealApprovalSchemaDryRunInput, FiscalRealApprovalSchemaDryRunResult, FiscalRealApprovalSchemaDryRunStatus } from './FiscalRealApprovalSchemaDryRunTypes';
import { FiscalRealApprovalSchemaValidator } from './FiscalRealApprovalSchemaValidator';

export class FiscalRealApprovalSchemaPolicy {
  public static enforce(input: FiscalRealApprovalSchemaDryRunInput): Partial<FiscalRealApprovalSchemaDryRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalSchemaValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record Schema Dry-Run 17.2 é apenas simulação administrativa de migration/schema e DDL controlado. Nenhuma tabela real foi criada, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Banco real, autorização real, gate unlock real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: 'BLOCKED_FOR_REAL_SCHEMA_CHANGE',
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

  public static getBaseResult(): FiscalRealApprovalSchemaDryRunResult {
    return {
        success: true,
        status: FiscalRealApprovalSchemaDryRunStatus.SCHEMA_MIGRATION_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        migrationPlanGenerated: true,
        controlledDdlSimulationGenerated: true,
        schemaDiffGenerated: true,
        rlsPlanGenerated: true,
        indexPlanGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record Schema Dry-Run 17.2 é apenas simulação administrativa de migration/schema e DDL controlado. Nenhuma tabela real foi criada, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Banco real, autorização real, gate unlock real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        schemaMigrationDryRunOnly: true,
        controlledDdlSimulationOnly: true,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        dmlExecuted: false,
        createTableExecuted: false,
        alterTableExecuted: false,
        dropTableExecuted: false,
        createIndexExecuted: false,
        rlsApplied: false,
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
        approvedForSchemaDryRunClosure: true,
        approvedForControlledDdlSimulation: true,
        approvedForRealSchemaMigration: false,
        approvedForRealDdlExecution: false,
        approvedForRealDmlExecution: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealExecutionAuthorization: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}
