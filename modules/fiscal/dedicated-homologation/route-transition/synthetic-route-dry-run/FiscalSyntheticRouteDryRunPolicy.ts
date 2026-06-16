import { FiscalSyntheticRouteDryRunInput, FiscalSyntheticRouteDryRunResult, FiscalSyntheticRouteDryRunStatus } from './FiscalSyntheticRouteDryRunTypes';
import { FiscalSyntheticRouteDryRunValidator } from './FiscalSyntheticRouteDryRunValidator';

export class FiscalSyntheticRouteDryRunPolicy {
  public static enforce(input: FiscalSyntheticRouteDryRunInput): Partial<FiscalSyntheticRouteDryRunResult> | null {
    let blockers: string[] = [];
    const validation = FiscalSyntheticRouteDryRunValidator.validate(input);

    blockers = [...validation.blockers];

    blockers.push('Synthetic Route Dry-Run 23.5 é apenas simulação administrativa end-to-end baseada em safe-shapes e comparação sintética de contratos de resposta. Nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalSyntheticRouteDryRunStatus.BLOCKED_FOR_REAL_ROUTE_EXECUTION,
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

  public static getBaseResult(): FiscalSyntheticRouteDryRunResult {
    return {
      success: true,
      status: FiscalSyntheticRouteDryRunStatus.SYNTHETIC_ROUTE_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      scenarioCatalogGenerated: true,
      legacyResponseShapesGenerated: true,
      v2ResponseShapesGenerated: true,
      shapeComparatorGenerated: true,
      compatibilityMatrixGenerated: true,
      contractDiffGenerated: true,
      noHandlerCallEvidenceGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Synthetic Route Dry-Run 23.5 é apenas simulação administrativa end-to-end baseada em safe-shapes e comparação sintética de contratos de resposta. Nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      syntheticRouteDryRunOnly: true,
      responseShapeComparatorOnly: true,
      syntheticScenarioOnly: true,
      safeShapeOnly: true,
      realRouteExecuted: false,
      realEndpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      requestDuplicated: false,
      realTrafficMirrored: false,
      shadowTrafficEnabled: false,
      cutoverExecuted: false,
      realRouteTransitionExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      canaryActivated: false,
      realFallbackExecuted: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
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
      approvedForSyntheticRouteDryRun: true,
      approvedForResponseShapeComparison: true,
      approvedForRealRouteExecution: false,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false,
      approvedForTrafficSwitch: false
    };
  }
}
