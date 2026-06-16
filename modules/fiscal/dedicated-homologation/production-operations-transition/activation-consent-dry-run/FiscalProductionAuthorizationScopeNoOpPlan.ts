export class FiscalProductionAuthorizationScopeNoOpPlan {
  public static getPlan() {
    return {
      authorizationScopeNoOpPlanGenerated: true,
      realAuthorizationGranted: false,
      productionV2Activated: false,
      description: 'Modelagem de escopo de autorização no-op. Não executa autorização produtiva.'
    };
  }
}
