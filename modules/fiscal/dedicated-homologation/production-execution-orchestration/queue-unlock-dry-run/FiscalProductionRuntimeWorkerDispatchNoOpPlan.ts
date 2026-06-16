export class FiscalProductionRuntimeWorkerDispatchNoOpPlan {
  public static generatePlan() {
    return {
      workerDispatchNoOpPlanGenerated: true,
      realWorkerDispatched: false,
      workersCreated: false,
      description: 'Modelagem do dispatch de worker no-op. Não cria nem despacha worker real.'
    };
  }
}
