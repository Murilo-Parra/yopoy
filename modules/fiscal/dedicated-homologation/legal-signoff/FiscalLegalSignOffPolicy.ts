import { FiscalLegalSignOffInput, FiscalLegalSignOffResult, FiscalLegalSignOffStatus } from './FiscalLegalSignOffTypes';
import { FiscalLegalSignOffValidator } from './FiscalLegalSignOffValidator';

export class FiscalLegalSignOffPolicy {
  public static enforce(input: FiscalLegalSignOffInput): Partial<FiscalLegalSignOffResult> | null {
    const blockers: string[] = [];
    const validation = FiscalLegalSignOffValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Legal Sign-Off 21.1 é apenas blueprint administrativo e contrato de assinatura não executável. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalSignOffStatus.BLOCKED_FOR_REAL_LEGAL_SIGNOFF,
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

  public static getBaseResult(): FiscalLegalSignOffResult {
    return {
      success: true,
      status: FiscalLegalSignOffStatus.LEGAL_SIGNOFF_BLUEPRINT_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      charterGenerated: true,
      signerResponsibilityMatrixGenerated: true,
      signatureEnvelopeGenerated: true,
      evidenceDependencyMatrixGenerated: true,
      readinessChecklistGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Legal Sign-Off 21.1 é apenas blueprint administrativo e contrato de assinatura não executável. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      legalSignoffBlueprintOnly: true,
      nonExecutableSignatureContractOnly: true,
      realLegalSignOffGranted: false,
      legalSignaturePersisted: false,
      definitiveLegalRecordCreated: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      pdfGenerated: false,
      externalSignerNotified: false,
      committeeApprovalGranted: false,
      realRiskAccepted: false,
      realWaiverGranted: false,
      runbookExecuted: false,
      productionV2Activated: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      appUseModified: false,
      middlewareInstalled: false,
      tapInstalled: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForLegalSignOffBlueprint: true,
      approvedForNonExecutableSignatureContract: true,
      approvedForRealLegalSignOff: false,
      approvedForRealSignaturePersistence: false,
      approvedForProductionV2: false
    };
  }
}
