import { FiscalLegalAuditClosureInput, FiscalLegalAuditClosureResult, FiscalLegalAuditClosureStatus } from './FiscalLegalAuditClosureTypes';
import { FiscalLegalAuditClosureValidator } from './FiscalLegalAuditClosureValidator';

export class FiscalLegalAuditClosurePolicy {
  public static enforce(input: FiscalLegalAuditClosureInput): Partial<FiscalLegalAuditClosureResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalLegalAuditClosureValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Legal Audit Trail Closure 18.5 é apenas fechamento documental administrativo e pacote de handoff para auditoria. Nenhum ledger real foi criado, nenhuma trilha legal real foi persistida, nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum banco real foi conectado, nenhum DML/DDL real foi executado, nenhuma autorização real foi concedida, SEFAZ real, XML/PDF real, Produção V2 e tráfego produtivo permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalAuditClosureStatus.BLOCKED_FOR_REAL_LEGAL_AUDIT_ACTIVATION,
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

  public static getBaseResult(): FiscalLegalAuditClosureResult {
    return {
        success: true,
        status: FiscalLegalAuditClosureStatus.LEGAL_AUDIT_GOVERNANCE_CLOSURE_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        closureInventoryGenerated: true,
        finalChecklistGenerated: true,
        evidencePackageGenerated: true,
        auditorHandoffGenerated: true,
        retentionHandoffGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Legal Audit Trail Closure 18.5 é apenas fechamento documental administrativo e pacote de handoff para auditoria. Nenhum ledger real foi criado, nenhuma trilha legal real foi persistida, nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum banco real foi conectado, nenhum DML/DDL real foi executado, nenhuma autorização real foi concedida, SEFAZ real, XML/PDF real, Produção V2 e tráfego produtivo permanecem bloqueados.'],
        warnings: [],
        legalAuditGovernanceClosureOnly: true,
        auditorHandoffEvidenceOnly: true,
        realLedgerCreated: false,
        legalAuditEventPersisted: false,
        legalAuditTrailPersisted: false,
        legalTrailDefinitive: false,
        realHashCalculated: false,
        legalHashDefinitive: false,
        legalTrailSigned: false,
        realSignatureApplied: false,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        schemaApplied: false,
        migrationExecuted: false,
        ddlExecuted: false,
        dmlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
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
        approvedForLegalAuditGovernanceClosure: true,
        approvedForAuditorHandoffEvidencePackage: true,
        approvedForRealLedgerCreation: false,
        approvedForRealLegalTrailPersistence: false,
        approvedForRealHashCalculation: false,
        approvedForRealLegalTrailSignature: false,
        approvedForRealAuthorizationGrant: false,
        approvedForProductionV2: false
    };
  }
}
