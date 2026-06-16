export class FiscalLegalWaiverReview {
  public static simulateReview() {
    return {
      waiverReviewGenerated: true,
      realWaiverGranted: false,
      description: 'Documentary waiver review. Real waiver is not granted. Blocked from activating real signature, SEFAZ, database, certificate, XML/PDF, runbook or production.'
    };
  }
}
