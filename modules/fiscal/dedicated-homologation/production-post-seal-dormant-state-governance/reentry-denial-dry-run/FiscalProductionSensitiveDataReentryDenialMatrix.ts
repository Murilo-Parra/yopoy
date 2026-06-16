export class FiscalProductionSensitiveDataReentryDenialMatrix {
  public static getMatrix() {
    return {
      sensitiveDataReentryDenialMatrixGenerated: true,
      realSensitiveDataAccessResumed: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Negar retomada de acesso a dados sensíveis.'
    };
  }
}
