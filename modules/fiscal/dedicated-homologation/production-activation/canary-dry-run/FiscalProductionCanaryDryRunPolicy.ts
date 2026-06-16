import { FiscalProductionCanaryDryRunInput, FiscalProductionCanaryDryRunResult, FiscalProductionCanaryDryRunStatus } from './FiscalProductionCanaryDryRunTypes';
import { FiscalProductionCanaryDryRunValidator } from './FiscalProductionCanaryDryRunValidator';

export class FiscalProductionCanaryDryRunPolicy {
  public static enforce(input: FiscalProductionCanaryDryRunInput): Partial<FiscalProductionCanaryDryRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalProductionCanaryDryRunValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Production Canary Dry-Run 19.2 é apenas simulação administrativa de escopo canário e plano de troca de tráfego. Nenhum Canary real foi ativado, nenhum tráfego real foi alterado, nenhum roteamento real para V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum release real foi executado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real, workers e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionCanaryDryRunStatus.BLOCKED_FOR_REAL_CANARY_ACTIVATION,
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

  public static getBaseResult(): FiscalProductionCanaryDryRunResult {
    return {
        success: true,
        status: FiscalProductionCanaryDryRunStatus.CANARY_SCOPE_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        scopeCatalogGenerated: true,
        tenantEligibilityGenerated: true,
        trafficSwitchPlanGenerated: true,
        percentagePlanGenerated: true,
        killSwitchReadinessGenerated: true,
        rollbackReadinessGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Production Canary Dry-Run 19.2 é apenas simulação administrativa de escopo canário e plano de troca de tráfego. Nenhum Canary real foi ativado, nenhum tráfego real foi alterado, nenhum roteamento real para V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum release real foi executado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real, workers e Produção V2 permanecem bloqueados.'],
        warnings: [],
        canaryScopeDryRunOnly: true,
        trafficSwitchDryRunOnly: true,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivated: false,
        trafficChanged: false,
        routeToV2: false,
        routeToLegacy: true,
        v2HandlerCalled: false,
        legacyHandlerCalledAsSideEffect: false,
        appUseModified: false,
        middlewareInstalled: false,
        tapInstalled: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realAuthorizationGranted: false,
        dmlExecuted: false,
        ddlExecuted: false,
        realDatabaseConnected: false,
        realSefazCalled: false,
        realCertificateLoaded: false,
        xmlSigned: false,
        pdfGenerated: false,
        workersCreated: false,
        schedulersCreated: false,
        readOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForCanaryScopeDryRun: true,
        approvedForTrafficSwitchDryRun: true,
        approvedForRealCanaryActivation: false,
        approvedForRealTrafficSwitch: false,
        approvedForRealRouteToV2: false,
        approvedForRealRelease: false,
        approvedForProductionV2: false
    };
  }
}
