export class FiscalProductionAuthorizationTokenReentryDenialMatrix {
  public static getMatrix() {
    return {
      authorizationTokenReentryDenialMatrixGenerated: true,
      realAuthorizationTokenIssued: false,
      description: 'Negar emissão de token de retomada.'
    };
  }
}
