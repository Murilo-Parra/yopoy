export class FiscalProductionV2RouteLockedPlan {
  public static getPlan() {
    return {
      v2RouteLockedPlanGenerated: true,
      routeToV2: false,
      productionV2Activated: false,
      description: 'Documentar que a rota V2 permanece bloqueada.'
    };
  }
}
