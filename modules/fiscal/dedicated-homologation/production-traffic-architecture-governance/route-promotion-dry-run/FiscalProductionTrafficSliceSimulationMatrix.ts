export class FiscalProductionTrafficSliceSimulationMatrix {
  public static getMatrix() {
    return {
      trafficSliceSimulationMatrixGenerated: true,
      realTrafficPercentageChanged: false,
      realTrafficChanged: false,
      description: 'Modelar fatias de tráfego apenas como simulação. Não alterar percentual real de tráfego.'
    };
  }
}
