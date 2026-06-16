export class FiscalRouteCanaryScopeSimulation {
  public static simulateScope() {
    return {
      canaryScopeSimulationGenerated: true,
      canaryActivationSimulated: true,
      canaryActivated: false,
      productionV2Activated: false,
      description: 'Documentary future canary scope model. No real canary or tenant is activated. No route is changed.'
    };
  }
}
