import { FiscalLegalSignatureDryRunInput, FiscalLegalSignatureDryRunResult, FiscalLegalSignatureDryRunStatus } from './FiscalLegalSignatureDryRunTypes';
import { FiscalLegalSignatureDryRunValidator } from './FiscalLegalSignatureDryRunValidator';

export class FiscalLegalSignatureDryRunPolicy {
  public static enforce(input: FiscalLegalSignatureDryRunInput): Partial<FiscalLegalSignatureDryRunResult> | null {
    const blockers: string[] = [];
    const validation = FiscalLegalSignatureDryRunValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Legal Signature Dry-Run 21.2 é apenas simulação administrativa do gate de assinatura legal e workflow de mock signature. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalLegalSignatureDryRunStatus.BLOCKED_FOR_REAL_LEGAL_SIGNATURE,
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

  public static getBaseResult(): FiscalLegalSignatureDryRunResult {
    return {
      success: true,
      status: FiscalLegalSignatureDryRunStatus.LEGAL_SIGNOFF_SIMULATION_GATE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      signerEligibilityGenerated: true,
      signatureIntentEnvelopeGenerated: true,
      mockSignatureWorkflowGenerated: true,
      quorumSimulationGenerated: true,
      sodReviewGenerated: true,
      evidenceReviewGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Legal Signature Dry-Run 21.2 é apenas simulação administrativa do gate de assinatura legal e workflow de mock signature. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      legalSignoffSimulationGateOnly: true,
      mockSignatureWorkflowOnly: true,
      realLegalSignOffGranted: false,
      mockSignatureSimulated: true,
      legalSignaturePersisted: false,
      definitiveLegalRecordCreated: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      pdfGenerated: false,
      externalSignerNotified: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
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
      approvedForLegalSignatureDryRun: true,
      approvedForMockSignatureWorkflow: true,
      approvedForRealLegalSignOff: false,
      approvedForRealSignaturePersistence: false,
      approvedForProductionV2: false
    };
  }
}
