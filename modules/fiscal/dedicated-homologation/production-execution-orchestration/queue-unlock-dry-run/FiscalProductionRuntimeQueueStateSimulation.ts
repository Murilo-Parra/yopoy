export class FiscalProductionRuntimeQueueStateSimulation {
  public static generateSimulation() {
    return {
      queueStateSimulationGenerated: true,
      realJobEnqueued: false,
      commandQueueStarted: false,
      description: 'Modelagem do estado simulado da queue. Não lê fila real nem conecta broker real.'
    };
  }
}
