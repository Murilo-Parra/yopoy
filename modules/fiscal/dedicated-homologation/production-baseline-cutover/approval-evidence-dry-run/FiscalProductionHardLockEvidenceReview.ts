export class FiscalProductionHardLockEvidenceReview {
  public static getReview() {
    return {
      hardLockEvidenceReviewGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Revisa evidências do hard execution lock. Não destrava gate real.'
    };
  }
}
