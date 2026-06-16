export class FiscalProductionCommandRollbackScenarioBlueprint {
  public static getBlueprint() {
    return {
      commandRollbackScenarioBlueprintGenerated: true,
      realRollbackExecuted: false,
      realGoLiveExecuted: false,
      description: 'Modelar cenário documental de rollback pós-comando. Não executar rollback real. Não executar go-live real.'
    };
  }
}
