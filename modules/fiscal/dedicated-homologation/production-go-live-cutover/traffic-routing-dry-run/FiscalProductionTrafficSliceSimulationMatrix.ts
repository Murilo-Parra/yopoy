export class FiscalProductionTrafficSliceSimulationMatrix {
  public static getMatrix() {
    return {
      trafficSliceSimulationMatrixGenerated: true,
      realCanaryActivated: false,
      realRolloutExecuted: false,
      description: 'Modelar fatias de tráfego apenas por metadados. Não executar canary real. Não executar rollout real.'
    };
  }
}
