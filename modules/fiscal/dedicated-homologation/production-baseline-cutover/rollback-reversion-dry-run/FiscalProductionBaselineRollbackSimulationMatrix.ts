export class FiscalProductionBaselineRollbackSimulationMatrix {
  public static getMatrix() {
    return {
      rollbackSimulationMatrixGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      description: 'Modelagem matriz de rollback simulada. Não executa rollback real.'
    };
  }
}
