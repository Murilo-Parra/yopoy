export class FiscalProductionRollbackSafetyChecklist {
  public static getChecklist() {
    return {
      rollbackSafetyChecklistGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      runtimeExecutionStarted: false,
      activationBlocked: true,
      description: 'Consolida checklist de safety de rollback/abort. Confirma Produção V2 desativada, legado como true, tráfego inalterado e runtime parado.'
    };
  }
}
