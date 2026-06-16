export class FiscalProductionSnapshotCompletenessReviewMatrix {
  public static getMatrix() {
    return {
      snapshotCompletenessReviewMatrixGenerated: true,
      realPayloadRead: false,
      realFiscalDocumentRead: false,
      description: 'Simular completude do snapshot sem leitura de payload real.'
    };
  }
}
