export class FiscalProductionOperationsSupportRunbookSimulationPlan {
  public static getPlan() {
    return {
      supportRunbookSimulationPlanGenerated: true,
      realRunbookExecuted: false,
      activationBlocked: true,
      description: 'Modelar runbook de suporte como simulação. Não executar runbook real.'
    };
  }
}
