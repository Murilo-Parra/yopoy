export class FiscalRouteProxyFallbackSimulation {
  public static simulateFallback() {
    return {
      fallbackSimulationGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      trafficChanged: false,
      description: 'Documentary fallback simulation for proxy. Legacy route is preserved.'
    };
  }
}
