export class FiscalProductionTrafficSwitchReadinessSimulation {
  public static getSimulation() {
    return {
      trafficSwitchReadinessSimulationGenerated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modelagem de readiness de traffic switch em simulação. Não altera tráfego real.'
    };
  }
}
