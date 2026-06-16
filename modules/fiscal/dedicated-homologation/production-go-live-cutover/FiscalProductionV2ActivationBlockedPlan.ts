export class FiscalProductionV2ActivationBlockedPlan {
  public static getPlan() {
    return {
      v2ActivationBlockedPlanGenerated: true,
      productionV2Activated: false,
      activationBlocked: true,
      description: 'Modelar bloqueio explícito da Produção V2.'
    };
  }
}
