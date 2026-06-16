export class FiscalProductionRouteToV2CommandDenialPlan {
  public static getPlan() {
    return {
      routeToV2CommandDenialPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Negar routeToV2 e preservar legado.'
    };
  }
}
