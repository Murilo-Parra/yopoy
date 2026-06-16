export class FiscalProductionV2HandlerNoCallPlan {
  public static getPlan() {
    return {
      v2HandlerNoCallPlanGenerated: true,
      routeToV2: false,
      productionV2Activated: false,
      realV2HandlerCalled: false,
      description: 'Impedir chamada operacional V2.'
    };
  }
}
