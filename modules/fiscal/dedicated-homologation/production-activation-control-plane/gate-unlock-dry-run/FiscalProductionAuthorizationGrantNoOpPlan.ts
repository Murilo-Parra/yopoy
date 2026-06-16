export class FiscalProductionAuthorizationGrantNoOpPlan {
  public static getPlan() {
    return {
      authorizationGrantNoOpPlanGenerated: true,
      realAuthorizationGranted: false,
      description: 'Modelar autorização como no-op. Não conceder autorização real.'
    };
  }
}
