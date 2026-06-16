export class FiscalProductionAuthorizationNoGrantPlan {
  public static getPlan() {
    return {
      authorizationNoGrantPlanGenerated: true,
      realAuthorizationGranted: false,
      realAuthorizationTokenIssued: false,
      description: 'Modelar autorização sem concessão real. Não emitir token real.'
    };
  }
}
