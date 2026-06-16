export class FiscalProductionStaticRouteComparisonPlan {
  public static getPlan() {
    return {
      staticRouteComparisonPlanGenerated: true,
      realEndpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      description: 'Modelagem de comparação estática entre rota legada e rota V2. Não chama endpoint real. Não chama handler real.'
    };
  }
}
