export class FiscalProductionEvidenceClassificationMatrix {
  public static getMatrix() {
    return {
      evidenceClassificationMatrixGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Classificar tipos de evidência apenas como metadados. Não incluir payload bruto, XML, PDF ou PFX.'
    };
  }
}
