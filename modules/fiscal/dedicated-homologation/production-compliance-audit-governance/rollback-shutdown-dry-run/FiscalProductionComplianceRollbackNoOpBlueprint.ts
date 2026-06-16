export class FiscalProductionComplianceRollbackNoOpBlueprint {
  public static getBlueprint() {
    return {
      rollbackNoOpBlueprintGenerated: true,
      realRollbackExecuted: false,
      realRollbackRecordPersisted: false,
      description: 'Modelar rollback de compliance como no-op. Não executar rollback real.'
    };
  }
}
