import { FiscalRealApprovalPersistenceGateInput, FiscalRealApprovalPersistenceGateResult, FiscalRealApprovalPersistenceGateStatus } from './FiscalRealApprovalPersistenceGateTypes';
import { FiscalRealApprovalPersistenceValidator } from './FiscalRealApprovalPersistenceValidator';

export class FiscalRealApprovalPersistenceGatePolicy {
  public static enforce(input: FiscalRealApprovalPersistenceGateInput): Partial<FiscalRealApprovalPersistenceGateResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalPersistenceValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Real Approval Record Persistence Gate 17.1 é apenas blueprint administrativo e contrato de trilha legal/auditável. Nenhum approval record real foi criado, persistido ou assinado. Nenhum schema real, migration real, DDL, DML, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Autorização real, gate unlock real, execução real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalPersistenceGateStatus.BLOCKED_FOR_REAL_PERSISTENCE,
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

  public static getBaseResult(): FiscalRealApprovalPersistenceGateResult {
    return {
        success: true,
        status: FiscalRealApprovalPersistenceGateStatus.PERSISTENCE_GATE_BLUEPRINT_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        schemaContractGenerated: true,
        legalAuditTrailContractGenerated: true,
        readinessChecklistGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Real Approval Record Persistence Gate 17.1 é apenas blueprint administrativo e contrato de trilha legal/auditável. Nenhum approval record real foi criado, persistido ou assinado. Nenhum schema real, migration real, DDL, DML, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Autorização real, gate unlock real, execução real, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        persistenceGateBlueprintOnly: true,
        legalAuditTrailContractOnly: true,
        approvalRecordPersisted: false,
        approvalRecordSigned: false,
        realApprovalRecordCreated: false,
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
        approvedForPersistenceGateBlueprintClosure: true,
        approvedForLegalAuditTrailContract: true,
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
