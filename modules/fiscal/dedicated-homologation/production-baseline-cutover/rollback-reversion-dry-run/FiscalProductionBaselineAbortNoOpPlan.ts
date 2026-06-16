export class FiscalProductionBaselineAbortNoOpPlan {
  public static getPlan() {
    return {
      abortNoOpPlanGenerated: true,
      realAbortExecuted: false,
      realCutoverExecuted: false,
      description: 'Modelar abort do baseline cutover como no-op. Não executar abort real.'
    };
  }
}
