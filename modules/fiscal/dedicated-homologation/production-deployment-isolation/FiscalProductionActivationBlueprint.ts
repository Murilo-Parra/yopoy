export class FiscalProductionActivationBlueprint {
  public static generateBlueprint() {
    return {
      productionActivationBlueprintOnly: true,
      productionV2Activated: false,
      releaseActivated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Documentary blueprint modeling future production activation without actually activating it.'
    };
  }
}
