export class FiscalProductionTrafficSliceSimulationMatrix {
  public static getMatrix() {
    return {
      trafficSliceSimulationMatrixGenerated: true,
      realTrafficSliceChanged: false,
      routeToV2: false,
      description: 'Modelar fatias percentuais de tráfego apenas como simulação. Não alterar traffic slice real.'
    };
  }
}
