export class FiscalRouteFallbackPlan {
  public static generatePlan() {
    return {
      fallbackPlanGenerated: true,
      description: 'Documentary fallback plan. Does not execute real fallback, alter traffic, or modify routing flags.'
    };
  }
}
