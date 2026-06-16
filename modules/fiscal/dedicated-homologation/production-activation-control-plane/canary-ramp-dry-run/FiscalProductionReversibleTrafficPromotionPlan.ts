export class FiscalProductionReversibleTrafficPromotionPlan {
  public static getPlan() {
    return {
      reversibleTrafficPromotionPlanGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      description: 'Modelar reversibilidade de promoção sem executar rollback real.'
    };
  }
}
