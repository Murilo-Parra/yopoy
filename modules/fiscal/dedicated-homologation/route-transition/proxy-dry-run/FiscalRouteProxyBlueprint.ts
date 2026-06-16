export class FiscalRouteProxyBlueprint {
  public static generateBlueprint() {
    return {
      proxyBlueprintGenerated: true,
      proxyInstalled: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Documentary blueprint of future proxy. No real proxy installed.'
    };
  }
}
