export class FiscalProductionCutoverAbortNoOpPlan {
  public static getPlan() {
    return {
      cutoverAbortNoOpPlanGenerated: true,
      realAbortExecuted: false,
      realRollbackExecuted: false,
      cutoverExecuted: false,
      description: 'Modelagem do abort de cutover em no-op. Não executa abort real. Não executa rollback real.'
    };
  }
}
