import { FiscalProductionRollbackKillSwitchInput, FiscalProductionRollbackKillSwitchResult, FiscalProductionRollbackKillSwitchStatus } from './FiscalProductionRollbackKillSwitchTypes';
import { FiscalProductionRollbackKillSwitchValidator } from './FiscalProductionRollbackKillSwitchValidator';

export class FiscalProductionRollbackKillSwitchPolicy {
  public static enforce(input: FiscalProductionRollbackKillSwitchInput): Partial<FiscalProductionRollbackKillSwitchResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalProductionRollbackKillSwitchValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Production Rollback & Kill-Switch 19.4 é apenas dry-run administrativo de rollback, fallback legado e governança de kill-switch. Nenhum rollback real foi executado, nenhum kill-switch real foi instalado ou ativado, nenhum tráfego real foi alterado, nenhum roteamento V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e Produção V2 permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionRollbackKillSwitchStatus.BLOCKED_FOR_REAL_ROLLBACK_OR_KILL_SWITCH,
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

  public static getBaseResult(): FiscalProductionRollbackKillSwitchResult {
    return {
        success: true,
        status: FiscalProductionRollbackKillSwitchStatus.PRODUCTION_ROLLBACK_DRY_RUN_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        rollbackPlanGenerated: true,
        killSwitchPlanGenerated: true,
        legacyFallbackPlanGenerated: true,
        releaseFreezePlanGenerated: true,
        trafficReversionPlanGenerated: true,
        dependencyMatrixGenerated: true,
        readinessMatrixGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Production Rollback & Kill-Switch 19.4 é apenas dry-run administrativo de rollback, fallback legado e governança de kill-switch. Nenhum rollback real foi executado, nenhum kill-switch real foi instalado ou ativado, nenhum tráfego real foi alterado, nenhum roteamento V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e Produção V2 permanecem bloqueados.'],
        warnings: [],
        productionRollbackDryRunOnly: true,
        killSwitchGovernanceDryRunOnly: true,
        rollbackExecuted: false,
        killSwitchInstalled: false,
        killSwitchActivated: false,
        releaseFrozen: false,
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
        approvedForRollbackDryRun: true,
        approvedForKillSwitchGovernanceDryRun: true,
        approvedForRealRollbackExecution: false,
        approvedForRealKillSwitchInstall: false,
        approvedForRealTrafficChange: false,
        approvedForRealRouteToV2: false,
        approvedForProductionV2: false
    };
  }
}
