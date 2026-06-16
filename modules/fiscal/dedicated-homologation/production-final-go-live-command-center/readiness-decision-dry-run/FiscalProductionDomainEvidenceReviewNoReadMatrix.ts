export class FiscalProductionDomainEvidenceReviewNoReadMatrix {
  public static getMatrix() {
    return {
      domainEvidenceReviewNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realFiscalDocumentRead: false,
      description: 'Revisar evidências por metadados sem ler payload real, XML, PDF, tenant data ou documento fiscal.'
    };
  }
}
