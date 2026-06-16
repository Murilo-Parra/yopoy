export class FiscalProductionWorkerDispatchNoOpPlan {
  public static getPlan() {
    return {
      workerDispatchNoOpPlanGenerated: true,
      realWorkerDispatched: false,
      description: 'Modelar despacho de workers como no-op. Não despachar worker real.'
    };
  }
}
