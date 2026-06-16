export class FiscalProductionDomainNoSensitiveDataContinuityMatrix {
  public static getMatrix() {
    return {
      domainNoSensitiveDataContinuityMatrixGenerated: true,
      realPayloadRead: false,
      tokenRead: false,
      realSecretRead: false,
      realCertificateRead: false,
      description: 'Consolidar ausência de leitura de payload e segredo.'
    };
  }
}
