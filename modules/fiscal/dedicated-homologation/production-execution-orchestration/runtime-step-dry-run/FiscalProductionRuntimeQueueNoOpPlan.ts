export class FiscalProductionRuntimeQueueNoOpPlan {
  public static generatePlan() {
    return {
      queueNoOpPlanGenerated: true,
      commandQueueStarted: false,
      workersCreated: false,
      description: 'Modelagem da fila futura como no-op. Não cria queue real nem executa queue.process.'
    };
  }
}
