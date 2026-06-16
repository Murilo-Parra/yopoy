export class FiscalProductionEvidenceCompletenessMetadataMatrix {
  public static getMatrix() {
    return {
      completenessMetadataMatrixGenerated: true,
      completenessRecordPersisted: false,
      payloadIncluded: false,
      description: 'Modelar completude de evidência apenas por metadados. Não persistir completeness record real.'
    };
  }
}
