export class FiscalProductionEvidenceClassificationDryRunMatrix {
  public static getMatrix() {
    return {
      classificationDryRunMatrixGenerated: true,
      realEvidencePersisted: false,
      description: 'Classificar evidências apenas por metadados. Não persistir classificação real.'
    };
  }
}
