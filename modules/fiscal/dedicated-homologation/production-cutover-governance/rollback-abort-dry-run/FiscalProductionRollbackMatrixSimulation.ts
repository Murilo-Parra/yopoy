export class FiscalProductionRollbackMatrixSimulation {
  public static getSimulation() {
    return {
      rollbackMatrixSimulationGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      description: 'Modelagem da matriz de rollback em modo simulado. Não executa rollback real. Não altera tráfego.'
    };
  }
}
