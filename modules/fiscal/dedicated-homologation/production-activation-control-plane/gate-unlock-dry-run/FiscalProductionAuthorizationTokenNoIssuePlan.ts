export class FiscalProductionAuthorizationTokenNoIssuePlan {
  public static getPlan() {
    return {
      authorizationTokenNoIssuePlanGenerated: true,
      realAuthorizationTokenIssued: false,
      tokenRead: false,
      description: 'Modelar plano de não emissão de token. Não emitir token real. Não ler token real.'
    };
  }
}
