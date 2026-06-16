export class FiscalProductionGatewayNoMutationPlan {
  public static getPlan() {
    return {
      gatewayNoMutationPlanGenerated: true,
      realGatewayMutated: false,
      description: 'Plano documentando que não haverá mutação no Gateway da aplicação.'
    };
  }
}
