import { FiscalRouteCanaryShadowInput, FiscalRouteCanaryShadowResult, FiscalRouteCanaryShadowStatus } from './FiscalRouteCanaryShadowDryRunTypes';
import { FiscalRouteCanaryShadowValidator } from './FiscalRouteCanaryShadowValidator';

export class FiscalRouteCanaryShadowPolicy {
  public static enforce(input: FiscalRouteCanaryShadowInput): Partial<FiscalRouteCanaryShadowResult> | null {
    const blockers: string[] = [];
    const validation = FiscalRouteCanaryShadowValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Route Canary Shadow Dry-Run 23.3 é apenas simulação administrativa de canary, shadow traffic, traffic mirror e approval gate de espelhamento. Nenhum canary real foi ativado, nenhum shadow traffic real foi executado, nenhum tráfego real foi espelhado, nenhuma request real foi duplicada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRouteCanaryShadowStatus.BLOCKED_FOR_REAL_CANARY_OR_SHADOW_TRAFFIC,
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

  public static getBaseResult(): FiscalRouteCanaryShadowResult {
    return {
      success: true,
      status: FiscalRouteCanaryShadowStatus.CANARY_SHADOW_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      canaryScopeSimulationGenerated: true,
      shadowTrafficPlanGenerated: true,
      trafficMirrorApprovalGateGenerated: true,
      canaryEligibilityGenerated: true,
      mirrorSafetyChecklistGenerated: true,
      shadowNoCaptureEvidenceGenerated: true,
      canaryRollbackReadinessGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Route Canary Shadow Dry-Run 23.3 é apenas simulação administrativa de canary, shadow traffic, traffic mirror e approval gate de espelhamento. Nenhum canary real foi ativado, nenhum shadow traffic real foi executado, nenhum tráfego real foi espelhado, nenhuma request real foi duplicada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      canaryShadowingDryRunOnly: true,
      trafficMirrorApprovalGateOnly: true,
      canaryActivationSimulated: true,
      shadowTrafficSimulated: true,
      trafficMirrorSimulated: true,
      canaryActivated: false,
      shadowTrafficEnabled: false,
      realTrafficMirrored: false,
      requestDuplicated: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
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
      approvedForCanaryShadowDryRun: true,
      approvedForTrafficMirrorApprovalGate: true,
      approvedForRealCanaryActivation: false,
      approvedForRealShadowTraffic: false,
      approvedForRealTrafficMirror: false,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false
    };
  }
}
