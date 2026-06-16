export class FiscalProductionComplianceFindingClassificationMatrix {
  public static getMatrix() {
    return {
      findingClassificationMatrixGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Classificar findings por metadados. Não ler payload real.'
    };
  }
}
