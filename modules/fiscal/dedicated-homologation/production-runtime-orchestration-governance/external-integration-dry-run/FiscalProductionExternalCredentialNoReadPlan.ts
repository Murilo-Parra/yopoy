export class FiscalProductionExternalCredentialNoReadPlan {
  public static getPlan() {
    return {
      externalCredentialNoReadPlanGenerated: true,
      tokenRead: false,
      realSecretRead: false,
      authorizationHeaderRead: false,
      description: 'Bloquear leitura de credenciais externas. Não ler token, secret, authorization header ou client secret.'
    };
  }
}
