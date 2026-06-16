export class FiscalProductionCutoverOrchestrationNoOpPlan {
  public static getPlan() {
    return {
      cutoverOrchestrationNoOpPlanGenerated: true,
      realCutoverOrchestrated: false,
      realCutoverExecuted: false,
      description: 'Modelagem de orquestração de cutover como no-op. Não orquestra cutover real. Não executa cutover real.'
    };
  }
}
