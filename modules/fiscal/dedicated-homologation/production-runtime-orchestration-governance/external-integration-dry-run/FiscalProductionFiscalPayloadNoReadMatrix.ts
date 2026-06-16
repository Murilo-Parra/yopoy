export class FiscalProductionFiscalPayloadNoReadMatrix {
  public static getMatrix() {
    return {
      fiscalPayloadNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      realTenantDataRead: false,
      realFiscalDocumentRead: false,
      description: 'Bloquear leitura de XML, PDF, payload fiscal, tenant data e documento fiscal.'
    };
  }
}
