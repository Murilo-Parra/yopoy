import { FiscalRealApprovalMockSignatureInput, FiscalRealApprovalMockSignatureResult, FiscalRealApprovalMockSignatureStatus } from './FiscalRealApprovalMockSignatureTypes';
import { FiscalRealApprovalSignatureValidator } from './FiscalRealApprovalSignatureValidator';

export class FiscalRealApprovalSignaturePolicy {
  public static enforce(input: FiscalRealApprovalMockSignatureInput): Partial<FiscalRealApprovalMockSignatureResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalRealApprovalSignatureValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Approval Record Mock Signature 17.4 é apenas simulação administrativa de assinatura e autorização externa. Nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum approval record real foi assinado, nenhum endpoint externo real foi chamado e nenhuma autorização real foi concedida. SEFAZ real, XML/PDF real, DML real, Produção V2 e tráfego produtivo permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRealApprovalMockSignatureStatus.BLOCKED_FOR_REAL_SIGNATURE,
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

  public static getBaseResult(): FiscalRealApprovalMockSignatureResult {
    return {
        success: true,
        status: FiscalRealApprovalMockSignatureStatus.MOCK_SIGNATURE_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        mockSignatureEnvelopeGenerated: true,
        mockCertificateGenerated: true,
        mockSignatureSimulated: true,
        externalAuthorizationSimulated: true,
        go: false,
        noGo: true,
        blockers: ['Approval Record Mock Signature 17.4 é apenas simulação administrativa de assinatura e autorização externa. Nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum approval record real foi assinado, nenhum endpoint externo real foi chamado e nenhuma autorização real foi concedida. SEFAZ real, XML/PDF real, DML real, Produção V2 e tráfego produtivo permanecem bloqueados.'],
        warnings: [],
        mockSignatureOnly: true,
        externalAuthorizationSimulationOnly: true,
        realCertificateLoaded: false,
        realPfxRead: false,
        certificatePasswordRead: false,
        approvalRecordSigned: false,
        realSignatureApplied: false,
        signatureEnvelopePersisted: false,
        externalApproverNotified: false,
        externalEndpointCalled: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        approvalRecordPersisted: false,
        realApprovalRecordCreated: false,
        dmlExecuted: false,
        insertExecuted: false,
        updateExecuted: false,
        deleteExecuted: false,
        commitExecuted: false,
        realDatabaseConnected: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
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
        approvedForMockSignatureSimulation: true,
        approvedForExternalAuthorizationSimulation: true,
        approvedForRealApprovalRecordSignature: false,
        approvedForRealCertificateLoad: false,
        approvedForRealAuthorizationGrant: false,
        approvedForRealApprovalRecordPersistence: false,
        approvedForRealExecutionAuthorization: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}
