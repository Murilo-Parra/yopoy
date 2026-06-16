export class FiscalProductionRegulatoryFilingPayloadMetadataMatrix {
  public static getMatrix() {
    return {
      filingPayloadMetadataMatrixGenerated: true,
      realPayloadRead: false,
      realXmlAttached: false,
      realPdfAttached: false,
      description: 'Modelar payload de filing apenas por metadados. Não ler payload real. Não anexar XML/PDF real.'
    };
  }
}
