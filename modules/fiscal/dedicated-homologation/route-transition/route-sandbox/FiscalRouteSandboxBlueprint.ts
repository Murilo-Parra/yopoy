export class FiscalRouteSandboxBlueprint {
  public static generateBlueprint() {
    return {
      sandboxBlueprintGenerated: true,
      routeSandboxBlueprintOnly: true,
      sandboxCreated: false,
      realRouteExecuted: false,
      realEndpointCalled: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Documentary route sandbox blueprint. No real sandbox is created.'
    };
  }
}
