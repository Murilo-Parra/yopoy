import { FiscalProductionActivationClosureInput, FiscalProductionActivationClosureResult, FiscalProductionActivationClosureStatus } from './FiscalProductionActivationClosureTypes';
import { FiscalProductionActivationClosureValidator } from './FiscalProductionActivationClosureValidator';

export class FiscalProductionActivationClosurePolicy {
  public static enforce(input: FiscalProductionActivationClosureInput): Partial<FiscalProductionActivationClosureResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalProductionActivationClosureValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Production Activation Closure 19.6 é apenas fechamento documental administrativo e pacote final de handoff de release. Nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum Canary real foi instalado, nenhum tráfego real foi alterado, nenhum dual-run real foi executado, nenhuma request/response real foi capturada, nenhum rollback real foi executado, nenhum kill-switch real foi instalado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionActivationClosureStatus.BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION,
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

  public static getBaseResult(): FiscalProductionActivationClosureResult {
    return {
        success: true,
        status: FiscalProductionActivationClosureStatus.PRODUCTION_ACTIVATION_GOVERNANCE_CLOSURE_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        closureInventoryGenerated: true,
        finalChecklistGenerated: true,
        evidencePackageGenerated: true,
        finalReadinessReviewGenerated: true,
        finalReleaseHandoffGenerated: true,
        postClosureRoadmapGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Production Activation Closure 19.6 é apenas fechamento documental administrativo e pacote final de handoff de release. Nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum Canary real foi instalado, nenhum tráfego real foi alterado, nenhum dual-run real foi executado, nenhuma request/response real foi capturada, nenhum rollback real foi executado, nenhum kill-switch real foi instalado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.'],
        warnings: [],
        productionActivationGovernanceClosureOnly: true,
        finalReleaseHandoffEvidenceOnly: true,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivated: false,
        trafficChanged: false,
        routeToV2: false,
        routeToLegacy: true,
        dualRunExecuted: false,
        realTrafficDuplicated: false,
        realRequestCaptured: false,
        realResponseCaptured: false,
        rollbackExecuted: false,
        killSwitchInstalled: false,
        killSwitchActivated: false,
        v2HandlerCalled: false,
        legacyHandlerCalledAsSideEffect: false,
        appUseModified: false,
        middlewareInstalled: false,
        tapInstalled: false,
        workersCreated: false,
        schedulersCreated: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        dmlExecuted: false,
        ddlExecuted: false,
        realDatabaseConnected: false,
        realSefazCalled: false,
        realCertificateLoaded: false,
        xmlSigned: false,
        pdfGenerated: false,
        readOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForProductionActivationClosure: true,
        approvedForFinalReleaseHandoffEvidence: true,
        approvedForRealProductionActivation: false,
        approvedForRealRelease: false,
        approvedForRealCanary: false,
        approvedForRealTrafficSwitch: false,
        approvedForRealDualRun: false,
        approvedForRealRollback: false,
        approvedForRealKillSwitch: false,
        approvedForProductionV2: false
    };
  }
}
