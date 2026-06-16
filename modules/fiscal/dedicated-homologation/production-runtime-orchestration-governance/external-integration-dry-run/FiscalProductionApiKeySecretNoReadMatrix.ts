export class FiscalProductionApiKeySecretNoReadMatrix {
  public static getMatrix() {
    return {
      apiKeySecretNoReadMatrixGenerated: true,
      apiKeyRead: false,
      clientSecretRead: false,
      description: 'Bloquear API keys e client secrets.'
    };
  }
}
