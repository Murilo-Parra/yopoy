import { FiscalLegalAuditSchemaDryRunInput, FiscalLegalAuditSchemaDryRunResult, FiscalLegalAuditSchemaDryRunStatus } from './FiscalLegalAuditSchemaDryRunTypes';
import { FiscalLegalAuditSchemaValidator } from './FiscalLegalAuditSchemaValidator';

export class FiscalLegalAuditSchemaPolicy {
  public static enforce(input: FiscalLegalAuditSchemaDryRunInput): Partial<FiscalLegalAuditSchemaDryRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalLegalAuditSchemaValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Legal Audit Trail Schema Dry-Run 18.2 é apenas simulação administrativa de migration/schema, retenção e RLS. Nenhuma tabela real foi criada, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. RLS real, índice real, política de retenção real, banco real, trilha legal real, autorização real, endpoint externo real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalAuditSchemaDryRunStatus.BLOCKED_FOR_REAL_SCHEMA_CHANGE,
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

  public static getBaseResult(): FiscalLegalAuditSchemaDryRunResult {
    return {
        success: true,
        status: FiscalLegalAuditSchemaDryRunStatus.LEGAL_AUDIT_SCHEMA_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        ledgerSchemaPlanGenerated: true,
        controlledDdlSimulationGenerated: true,
        rlsPlanGenerated: true,
        retentionDdlPlanGenerated: true,
        indexPlanGenerated: true,
        schemaDiffGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Legal Audit Trail Schema Dry-Run 18.2 é apenas simulação administrativa de migration/schema, retenção e RLS. Nenhuma tabela real foi criada, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. RLS real, índice real, política de retenção real, banco real, trilha legal real, autorização real, endpoint externo real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        legalAuditSchemaDryRunOnly: true,
        retentionRlsDdlSimulationOnly: true,
        realLedgerCreated: false,
        legalAuditTrailPersisted: false,
        legalTrailDefinitive: false,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        dmlExecuted: false,
        createTableExecuted: false,
        alterTableExecuted: false,
        dropTableExecuted: false,
        createIndexExecuted: false,
        rlsApplied: false,
        retentionPolicyApplied: false,
        retentionDeleteExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        approvalRecordPersisted: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        externalEndpointCalled: false,
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
        approvedForLegalAuditSchemaDryRunClosure: true,
        approvedForRetentionRlsDdlSimulation: true,
        approvedForRealLedgerCreation: false,
        approvedForRealLegalTrailPersistence: false,
        approvedForRealSchemaMigration: false,
        approvedForRealDdlExecution: false,
        approvedForRealDmlExecution: false,
        approvedForRealAuthorizationGrant: false,
        approvedForProductionV2: false
    };
  }
}
