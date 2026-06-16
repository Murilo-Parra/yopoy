import { FiscalFinalGoLiveClosureInput, FiscalFinalGoLiveClosureResult, FiscalFinalGoLiveClosureStatus } from './FiscalFinalGoLiveClosureTypes';
import { FiscalFinalGoLiveClosureValidator } from './FiscalFinalGoLiveClosureValidator';

export class FiscalFinalGoLiveClosurePolicy {
  public static enforce(input: FiscalFinalGoLiveClosureInput): Partial<FiscalFinalGoLiveClosureResult> | null {
    const blockers: string[] = [];
    const validation = FiscalFinalGoLiveClosureValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Final Go-Live Closure 22.3 é apenas fechamento documental administrativo e pacote final de evidências sem ativação. Nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum release real foi executado, nenhum canary real foi ativado, nenhum runbook real foi executado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador/signatário externo foi notificado, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalFinalGoLiveClosureStatus.BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION,
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

  public static getBaseResult(): FiscalFinalGoLiveClosureResult {
    return {
      success: true,
      status: FiscalFinalGoLiveClosureStatus.FINAL_GOLIVE_GOVERNANCE_CLOSURE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      closureInventoryGenerated: true,
      finalChecklistGenerated: true,
      evidencePackageGenerated: true,
      noActivationHandoffGenerated: true,
      postClosureRoadmapGenerated: true,
      finalReadinessReviewGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Final Go-Live Closure 22.3 é apenas fechamento documental administrativo e pacote final de evidências sem ativação. Nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum release real foi executado, nenhum canary real foi ativado, nenhum runbook real foi executado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador/signatário externo foi notificado, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      finalGoLiveGovernanceClosureOnly: true,
      noActivationHandoffEvidenceOnly: true,
      productionV2Activated: false,
      releaseActivated: false,
      canaryActivated: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      realRunbookExecuted: false,
      appUseModified: false,
      middlewareInstalled: false,
      tapInstalled: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
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
      dmlExecuted: false,
      ddlExecuted: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForFinalGoLiveClosure: true,
      approvedForNoActivationHandoffEvidence: true,
      approvedForRealProductionActivation: false,
      approvedForProductionV2: false,
      approvedForTrafficSwitch: false
    };
  }
}
