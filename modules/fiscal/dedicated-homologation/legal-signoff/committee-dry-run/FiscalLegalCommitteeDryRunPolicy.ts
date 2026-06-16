import { FiscalLegalCommitteeDryRunInput, FiscalLegalCommitteeDryRunResult, FiscalLegalCommitteeDryRunStatus } from './FiscalLegalCommitteeDryRunTypes';
import { FiscalLegalCommitteeDryRunValidator } from './FiscalLegalCommitteeDryRunValidator';

export class FiscalLegalCommitteeDryRunPolicy {
  public static enforce(input: FiscalLegalCommitteeDryRunInput): Partial<FiscalLegalCommitteeDryRunResult> | null {
    const blockers: string[] = [];
    const validation = FiscalLegalCommitteeDryRunValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Legal Sign-Off Committee Dry-Run 21.3 é apenas simulação administrativa do comitê legal, matriz de aprovação, quórum, risk acceptance, waiver, revisão de evidências e recomendação final. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalCommitteeDryRunStatus.BLOCKED_FOR_REAL_LEGAL_COMMITTEE_APPROVAL,
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

  public static getBaseResult(): FiscalLegalCommitteeDryRunResult {
    return {
      success: true,
      status: FiscalLegalCommitteeDryRunStatus.LEGAL_SIGNOFF_COMMITTEE_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      committeeCharterGenerated: true,
      approvalMatrixGenerated: true,
      quorumSimulationGenerated: true,
      riskAcceptanceReviewGenerated: true,
      waiverReviewGenerated: true,
      signatureEvidenceReviewGenerated: true,
      finalRecommendationGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Legal Sign-Off Committee Dry-Run 21.3 é apenas simulação administrativa do comitê legal, matriz de aprovação, quórum, risk acceptance, waiver, revisão de evidências e recomendação final. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      legalSignoffCommitteeDryRunOnly: true,
      legalRiskAcceptanceReviewOnly: true,
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
      approvedForLegalCommitteeDryRun: true,
      approvedForLegalRiskAcceptanceReview: true,
      approvedForRealCommitteeApproval: false,
      approvedForRealLegalSignOff: false,
      approvedForRealRiskAcceptance: false,
      approvedForRealWaiver: false,
      approvedForProductionV2: false
    };
  }
}
