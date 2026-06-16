import { FiscalProductionDualRunInput, FiscalProductionDualRunResult, FiscalProductionDualRunStatus } from './FiscalProductionDualRunTypes';
import { FiscalProductionDualRunValidator } from './FiscalProductionDualRunValidator';

export class FiscalProductionDualRunPolicy {
  public static enforce(input: FiscalProductionDualRunInput): Partial<FiscalProductionDualRunResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalProductionDualRunValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Production Dual-Run 19.5 é apenas dry-run administrativo de dual-run, telemetria e ativação reversível. Nenhum dual-run real foi executado, nenhum tráfego real foi duplicado, nenhuma request/response real foi capturada, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhuma Produção V2 foi ativada, nenhum rollback real foi executado, nenhum kill-switch real foi instalado, SEFAZ real, certificado real, XML/PDF real e workers permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionDualRunStatus.BLOCKED_FOR_REAL_DUAL_RUN_OR_ACTIVATION,
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

  public static getBaseResult(): FiscalProductionDualRunResult {
    return {
        success: true,
        status: FiscalProductionDualRunStatus.PRODUCTION_DUAL_RUN_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        dualRunPlanGenerated: true,
        telemetryReadinessGenerated: true,
        comparisonPlanGenerated: true,
        reversibleActivationPlanGenerated: true,
        observabilityMatrixGenerated: true,
        decisionCheckpointMatrixGenerated: true,
        rollbackCriteriaGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Production Dual-Run 19.5 é apenas dry-run administrativo de dual-run, telemetria e ativação reversível. Nenhum dual-run real foi executado, nenhum tráfego real foi duplicado, nenhuma request/response real foi capturada, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhuma Produção V2 foi ativada, nenhum rollback real foi executado, nenhum kill-switch real foi instalado, SEFAZ real, certificado real, XML/PDF real e workers permanecem bloqueados.'],
        warnings: [],
        productionDualRunDryRunOnly: true,
        reversibleActivationTelemetryOnly: true,
        dualRunExecuted: false,
        realTrafficDuplicated: false,
        realRequestCaptured: false,
        realResponseCaptured: false,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivated: false,
        rollbackExecuted: false,
        killSwitchInstalled: false,
        killSwitchActivated: false,
        trafficChanged: false,
        routeToV2: false,
        routeToLegacy: true,
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
        approvedForDualRunDryRun: true,
        approvedForReversibleActivationTelemetry: true,
        approvedForRealDualRun: false,
        approvedForRealTrafficDuplication: false,
        approvedForRealProductionActivation: false,
        approvedForRealRouteToV2: false,
        approvedForProductionV2: false
    };
  }
}
