export class FiscalProductionGoLiveRollbackNoOpBlueprint {
  public static getBlueprint() {
    return {
      rollbackNoOpBlueprintGenerated: true,
      realRollbackExecuted: false,
      realTrafficReverted: false,
      description: 'Modelar rollback de go-live/cutover como no-op. Não executar rollback real. Não reverter tráfego real.'
    };
  }
}
