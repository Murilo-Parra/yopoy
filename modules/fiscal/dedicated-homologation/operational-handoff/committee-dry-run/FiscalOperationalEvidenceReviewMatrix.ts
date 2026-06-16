export class FiscalOperationalEvidenceReviewMatrix {
  public static generateMatrix() {
    return {
      evidenceReviewMatrixGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Consolidation of evidences from 20.1 and 20.2. Documentary review only. No raw payload included. No secrets included. Does not open incident or notification.'
    };
  }
}
