export class FiscalProductionRetryBackoffNoActivationMatrix {
  public static getMatrix() {
    return {
      retryBackoffNoActivationMatrixGenerated: true,
      realRetryActivated: false,
      description: 'Modelar retry/backoff sem ativação. Não criar estado real de retry.'
    };
  }
}
