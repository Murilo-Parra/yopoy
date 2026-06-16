export class FiscalLegalSignerEligibilityMatrix {
  public static generateMatrix() {
    return {
      signerEligibilityGenerated: true,
      description: 'Documentary eligibility model. Does not grant real signature.',
      externalSignerNotified: false
    };
  }
}
