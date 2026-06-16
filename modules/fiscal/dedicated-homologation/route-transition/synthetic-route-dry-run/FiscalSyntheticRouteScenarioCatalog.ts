export class FiscalSyntheticRouteScenarioCatalog {
  public static generateCatalog() {
    return {
      scenarioCatalogGenerated: true,
      syntheticScenarioOnly: true,
      realEndpointCalled: false,
      realRouteExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Documentary catalog of synthetic route scenarios. No real endpoint or handler is called.'
    };
  }
}
