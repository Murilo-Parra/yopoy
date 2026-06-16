export class FiscalProductionRuntimeStepRollbackPlan {
  public static generatePlan() {
    return {
      stepRollbackPlanGenerated: true,
      realRollbackExecuted: false,
      description: 'Modelagem de rollback de steps em modo documental. Não executa rollback real.'
    };
  }
}
