export class FiscalFinalGoLiveTrafficSwitchSimulation {
  public static simulateSwitch() {
    return {
      trafficSwitchSimulationGenerated: true,
      trafficSwitchSimulated: true,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Traffic switch simulated in metadata. Real traffic is unchanged.'
    };
  }
}
