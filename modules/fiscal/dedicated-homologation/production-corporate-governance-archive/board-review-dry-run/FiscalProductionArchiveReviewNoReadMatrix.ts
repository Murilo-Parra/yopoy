export class FiscalProductionArchiveReviewNoReadMatrix {
  public static getMatrix() {
    return {
      archiveReviewNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realFiscalDocumentRead: false,
      description: 'Simular revisão do archive sem ler payload/evidência real.'
    };
  }
}
