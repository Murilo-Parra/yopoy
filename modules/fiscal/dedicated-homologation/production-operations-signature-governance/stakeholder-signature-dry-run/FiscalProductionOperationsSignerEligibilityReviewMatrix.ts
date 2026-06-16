export class FiscalProductionOperationsSignerEligibilityReviewMatrix {
  public static getMatrix() {
    return {
      signerEligibilityReviewMatrixGenerated: true,
      realSignerNotified: false,
      realSignatureCollected: false,
      description: 'Modelar elegibilidade de signatários. Não notificar signatário real. Não coletar assinatura real.'
    };
  }
}
