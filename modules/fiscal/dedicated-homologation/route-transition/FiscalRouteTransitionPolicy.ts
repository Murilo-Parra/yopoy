import { FiscalRouteTransitionInput, FiscalRouteTransitionResult, FiscalRouteTransitionStatus } from './FiscalRouteTransitionTypes';
import { FiscalRouteTransitionValidator } from './FiscalRouteTransitionValidator';

export class FiscalRouteTransitionPolicy {
  public static enforce(input: FiscalRouteTransitionInput): Partial<FiscalRouteTransitionResult> | null {
    const blockers: string[] = [];
    const validation = FiscalRouteTransitionValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Route Transition 23.1 é apenas blueprint administrativo e contrato de preservação do legado. Nenhuma transição real de rotas foi executada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum app.use legado foi modificado, nenhum middleware, proxy ou tap real foi instalado, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRouteTransitionStatus.BLOCKED_FOR_REAL_ROUTE_TRANSITION,
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

  public static getBaseResult(): FiscalRouteTransitionResult {
    return {
      success: true,
      status: FiscalRouteTransitionStatus.ROUTE_TRANSITION_BLUEPRINT_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      blueprintGenerated: true,
      legacyRouteInventoryGenerated: true,
      v2RouteReadinessGenerated: true,
      legacyPreservationContractGenerated: true,
      noInterceptionContractGenerated: true,
      fallbackPlanGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Route Transition 23.1 é apenas blueprint administrativo e contrato de preservação do legado. Nenhuma transição real de rotas foi executada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum app.use legado foi modificado, nenhum middleware, proxy ou tap real foi instalado, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      routeTransitionBlueprintOnly: true,
      legacyPreservationContractOnly: true,
      realRouteTransitionExecuted: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      appUseModified: false,
      middlewareInstalled: false,
      proxyInstalled: false,
      tapInstalled: false,
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
      approvedForRouteTransitionBlueprint: true,
      approvedForLegacyPreservationContract: true,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false,
      approvedForTrafficSwitch: false
    };
  }
}
