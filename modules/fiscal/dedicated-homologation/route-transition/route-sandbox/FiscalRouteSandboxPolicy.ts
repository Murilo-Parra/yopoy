import { FiscalRouteSandboxInput, FiscalRouteSandboxResult, FiscalRouteSandboxStatus } from './FiscalRouteSandboxTypes';
import { FiscalRouteSandboxValidator } from './FiscalRouteSandboxValidator';

export class FiscalRouteSandboxPolicy {
  public static enforce(input: FiscalRouteSandboxInput): Partial<FiscalRouteSandboxResult> | null {
    let blockers: string[] = [];
    const validation = FiscalRouteSandboxValidator.validate(input);

    blockers = [...validation.blockers];

    blockers.push('Route Sandbox 23.6 é apenas blueprint administrativo de sandbox, walled garden e contrato de isolamento sintético. Nenhum sandbox real foi criado, nenhum walled garden real foi criado, nenhuma rede real foi provisionada, nenhum banco real foi provisionado, nenhum tenant real isolado foi criado, nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalRouteSandboxStatus.BLOCKED_FOR_REAL_SANDBOX_PROVISIONING,
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

  public static getBaseResult(): FiscalRouteSandboxResult {
    return {
      success: true,
      status: FiscalRouteSandboxStatus.ROUTE_SANDBOX_BLUEPRINT_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      sandboxBlueprintGenerated: true,
      walledGardenIsolationGenerated: true,
      networkPlanGenerated: true,
      tenantIsolationPlanGenerated: true,
      dataBoundaryPlanGenerated: true,
      noRuntimeExecutionEvidenceGenerated: true,
      syntheticOnlyContractGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Route Sandbox 23.6 é apenas blueprint administrativo de sandbox, walled garden e contrato de isolamento sintético. Nenhum sandbox real foi criado, nenhum walled garden real foi criado, nenhuma rede real foi provisionada, nenhum banco real foi provisionado, nenhum tenant real isolado foi criado, nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      routeSandboxBlueprintOnly: true,
      walledGardenIsolationOnly: true,
      syntheticOnlyContractOnly: true,
      sandboxCreated: false,
      walledGardenCreated: false,
      networkProvisioned: false,
      databaseProvisioned: false,
      tenantIsolationCreated: false,
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
      approvedForRouteSandboxBlueprint: true,
      approvedForWalledGardenIsolation: true,
      approvedForSyntheticOnlyContract: true,
      approvedForRealSandboxProvisioning: false,
      approvedForRealRouteExecution: false,
      approvedForRealRouteTransition: false,
      approvedForProductionV2: false
    };
  }
}
