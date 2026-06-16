export class FiscalRouteMiddlewareSimulationPlan {
  public static generatePlan() {
    return {
      middlewareSimulationGenerated: true,
      middlewareInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      description: 'Middleware simulation plan. Does not alter Express or create productive middleware functions.'
    };
  }
}
