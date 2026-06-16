export class FiscalProductionConsentSignerEligibilityMatrix {
  public static getMatrix() {
    return {
      signerEligibilityMatrixGenerated: true,
      realApproverNotified: false,
      realAuthorizationGranted: false,
      description: 'Modelagem de elegibilidade dos signatários/aprovadores. Não notifica aprovadores reais nem concede autorização real.'
    };
  }
}
