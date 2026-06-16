import { FiscalLegalSignOffClosureInput, FiscalLegalSignOffClosureResult, FiscalLegalSignOffClosureStatus } from './FiscalLegalSignOffClosureTypes';
import { FiscalLegalSignOffClosureValidator } from './FiscalLegalSignOffClosureValidator';

export class FiscalLegalSignOffClosurePolicy {
  public static enforce(input: FiscalLegalSignOffClosureInput): Partial<FiscalLegalSignOffClosureResult> | null {
    const blockers: string[] = [];
    const validation = FiscalLegalSignOffClosureValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Legal Sign-Off Closure 21.4 é apenas fechamento documental administrativo e pacote final de evidências jurídicas. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhuma biblioteca criptográfica real foi acionada, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalSignOffClosureStatus.BLOCKED_FOR_REAL_LEGAL_SIGNATURE_OR_RECORD,
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

  public static getBaseResult(): FiscalLegalSignOffClosureResult {
    return {
      success: true,
      status: FiscalLegalSignOffClosureStatus.LEGAL_SIGNOFF_GOVERNANCE_CLOSURE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      closureInventoryGenerated: true,
      finalChecklistGenerated: true,
      evidencePackageGenerated: true,
      finalSignatureReadinessGenerated: true,
      finalCommitteeHandoffGenerated: true,
      postSignOffRoadmapGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Legal Sign-Off Closure 21.4 é apenas fechamento documental administrativo e pacote final de evidências jurídicas. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhuma biblioteca criptográfica real foi acionada, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      legalSignoffGovernanceClosureOnly: true,
      finalLegalEvidenceHandoffOnly: true,
      committeeApprovalGranted: false,
      realLegalSignOffGranted: false,
      legalSignaturePersisted: false,
      definitiveLegalRecordCreated: false,
      realRiskAccepted: false,
      realWaiverGranted: false,
      externalApproverNotified: false,
      externalSignerNotified: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
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
      approvedForLegalSignOffClosure: true,
      approvedForFinalLegalEvidenceHandoff: true,
      approvedForRealCommitteeApproval: false,
      approvedForRealLegalSignOff: false,
      approvedForRealSignaturePersistence: false,
      approvedForDefinitiveLegalRecord: false,
      approvedForProductionV2: false
    };
  }
}
