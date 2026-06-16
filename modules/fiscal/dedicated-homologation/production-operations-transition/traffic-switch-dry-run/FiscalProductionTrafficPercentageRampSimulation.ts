export class FiscalProductionTrafficPercentageRampSimulation {
  public static getSimulation() {
    return {
      trafficPercentageRampSimulationGenerated: true,
      trafficChanged: false,
      canaryActivated: false,
      description: 'Modelagem de rampa percentual em simulação. Não promove tráfego real nem cria canary real.'
    };
  }
}
