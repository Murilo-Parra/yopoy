import { FiscalLegalAuditImmutabilityInput, FiscalLegalAuditImmutabilityResult, FiscalLegalAuditImmutabilityStatus } from './FiscalLegalAuditImmutabilityTypes';
import { FiscalLegalAuditImmutabilityValidator } from './FiscalLegalAuditImmutabilityValidator';

export class FiscalLegalAuditImmutabilityPolicy {
  public static enforce(input: FiscalLegalAuditImmutabilityInput): Partial<FiscalLegalAuditImmutabilityResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalLegalAuditImmutabilityValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Legal Audit Trail Immutability 18.4 é apenas simulação administrativa de hash, imutabilidade e assinatura mockada de evidência. Nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum endpoint externo real foi chamado, nenhuma trilha legal real foi persistida, nenhum DML/DDL real foi executado, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalAuditImmutabilityStatus.BLOCKED_FOR_REAL_IMMUTABILITY,
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

  public static getBaseResult(): FiscalLegalAuditImmutabilityResult {
    return {
        success: true,
        status: FiscalLegalAuditImmutabilityStatus.IMMUTABILITY_HASH_SIMULATION_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        hashChainPlanGenerated: true,
        mockHashGenerated: true,
        evidenceDigestGenerated: true,
        mockSignatureEnvelopeGenerated: true,
        integrityVerificationSimulated: true,
        evidencePackageGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Legal Audit Trail Immutability 18.4 é apenas simulação administrativa de hash, imutabilidade e assinatura mockada de evidência. Nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum endpoint externo real foi chamado, nenhuma trilha legal real foi persistida, nenhum DML/DDL real foi executado, SEFAZ real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        legalAuditImmutabilitySimulationOnly: true,
        mockEvidenceSignatureOnly: true,
        realHashCalculated: false,
        legalHashDefinitive: false,
        realSignatureApplied: false,
        legalTrailSigned: false,
        approvalRecordSigned: false,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        externalEndpointCalled: false,
        externalApproverNotified: false,
        legalAuditEventPersisted: false,
        legalAuditTrailPersisted: false,
        approvalRecordPersisted: false,
        dmlExecuted: false,
        ddlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
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
        approvedForImmutabilityHashSimulation: true,
        approvedForMockEvidenceSignature: true,
        approvedForRealHashCalculation: false,
        approvedForRealLegalTrailSignature: false,
        approvedForRealCertificateLoad: false,
        approvedForRealLegalTrailPersistence: false,
        approvedForRealAuthorizationGrant: false,
        approvedForProductionV2: false
    };
  }
}
