import { FiscalRouteCutoverInput, FiscalRouteCutoverResult, FiscalRouteCutoverStatus } from './FiscalRouteCutoverDryRunTypes';
import { FiscalRouteCutoverValidator } from './FiscalRouteCutoverValidator';

export class FiscalRouteCutoverPolicy {
  public static enforce(input: FiscalRouteCutoverInput): Partial<FiscalRouteCutoverResult> | null {
    let blockers: string[];
    const validation = FiscalRouteCutoverValidator.validate(input);

    blockers = [...validation.blockers];

    blockers.push('Route Cutover Dry-Run 23.4 é apenas simulação administrativa de cutover, fallback legado, shadow rollback, critérios de abort e matriz de decisão. Nenhum cutover real foi executado, nenhuma transição real de rotas foi executada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum canary real foi ativado, nenhum rollback real de shadow foi executado, nenhum fallback real foi executado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma request real foi duplicada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRouteCutoverStatus.BLOCKED_FOR_REAL_ROUTE_CUTOVER,
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

  public static getBaseResult(): FiscalRouteCutoverResult {
    return {
      success: true,
      status: FiscalRouteCutoverStatus.ROUTE_CUTOVER_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      cutoverWindowPlanGenerated: true,
      cutoverSimulationPlanGenerated: true,
      legacyFallbackGovernanceGenerated: true,
      shadowRollbackPlanGenerated: true,
      abortCriteriaGenerated: true,
      decisionMatrixGenerated: true,
      readinessChecklistGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Route Cutover Dry-Run 23.4 é apenas simulação administrativa de cutover, fallback legado, shadow rollback, critérios de abort e matriz de decisão. Nenhum cutover real foi executado, nenhuma transição real de rotas foi executada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum canary real foi ativado, nenhum rollback real de shadow foi executado, nenhum fallback real foi executado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma request real foi duplicada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      routeCutoverDryRunOnly: true,
      shadowRollbackGovernanceOnly: true,
      cutoverSimulated: true,
      cutoverExecuted: false,
      realRouteTransitionExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      canaryActivated: false,
      shadowRollbackExecuted: false,
      realFallbackExecuted: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      requestDuplicated: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      v2HandlerCalled: false,
      legacyHandlerCalledAsSideEffect: false,
      productionV2Activated: false,
      releaseActivated: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
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
      approvedForRouteCutoverDryRun: true,
      approvedForShadowRollbackGovernance: true,
      approvedForRealRouteCutover: false,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false,
      approvedForTrafficSwitch: false
    };
  }
}
