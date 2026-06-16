export class FiscalProductionCanaryPercentageSimulation {
  public static simulatePercentage() {
    return {
      canaryPercentageSimulationGenerated: true,
      canaryActivated: false,
      routeToV2: false,
      trafficChanged: false,
      description: 'Synthetic canary percentage simulation. No real traffic is diverted or activated.'
    };
  }
}
