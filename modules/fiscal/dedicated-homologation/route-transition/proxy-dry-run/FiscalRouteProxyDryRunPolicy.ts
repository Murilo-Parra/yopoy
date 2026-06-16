import { FiscalRouteProxyDryRunInput, FiscalRouteProxyDryRunResult, FiscalRouteProxyDryRunStatus } from './FiscalRouteProxyDryRunTypes';
import { FiscalRouteProxyDryRunValidator } from './FiscalRouteProxyDryRunValidator';

export class FiscalRouteProxyDryRunPolicy {
  public static enforce(input: FiscalRouteProxyDryRunInput): Partial<FiscalRouteProxyDryRunResult> | null {
    const blockers: string[] = [];
    const validation = FiscalRouteProxyDryRunValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Route Proxy Dry-Run 23.2 é apenas simulação administrativa de proxy, middleware, tap e roteamento condicional. Nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum tráfego real foi alterado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRouteProxyDryRunStatus.BLOCKED_FOR_REAL_PROXY_INSTALLATION,
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

  public static getBaseResult(): FiscalRouteProxyDryRunResult {
    return {
      success: true,
      status: FiscalRouteProxyDryRunStatus.ROUTE_PROXY_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      proxyBlueprintGenerated: true,
      middlewareSimulationGenerated: true,
      tapSimulationGenerated: true,
      conditionalRoutingSimulationGenerated: true,
      noInterceptionEvidenceGenerated: true,
      fallbackSimulationGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Route Proxy Dry-Run 23.2 é apenas simulação administrativa de proxy, middleware, tap e roteamento condicional. Nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum tráfego real foi alterado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      proxyMiddlewareDryRunOnly: true,
      noInterceptionSimulationOnly: true,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      requestCaptured: false,
      responseCaptured: false,
      v2HandlerCalled: false,
      legacyHandlerCalledAsSideEffect: false,
      productionV2Activated: false,
      releaseActivated: false,
      canaryActivated: false,
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
      approvedForRouteProxyDryRun: true,
      approvedForNoInterceptionSimulation: true,
      approvedForRealProxyInstallation: false,
      approvedForRealMiddlewareInstall: false,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false,
      approvedForTrafficSwitch: false
    };
  }
}
