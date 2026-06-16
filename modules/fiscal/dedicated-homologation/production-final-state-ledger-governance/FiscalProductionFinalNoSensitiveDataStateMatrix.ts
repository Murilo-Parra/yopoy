export class FiscalProductionFinalNoSensitiveDataStateMatrix {
  public static getMatrix() {
    return {
      finalNoSensitiveDataStateMatrixGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realPayloadRead: false,
      realFiscalDocumentRead: false,
      description: 'Registrar ausência final de leitura de dado sensível.'
    };
  }
}
