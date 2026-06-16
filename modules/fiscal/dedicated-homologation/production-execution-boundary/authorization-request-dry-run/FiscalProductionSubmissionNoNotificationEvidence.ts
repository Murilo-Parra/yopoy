export class FiscalProductionSubmissionNoNotificationEvidence {
  public static generateEvidence() {
    return {
      noNotificationEvidenceGenerated: true,
      realStakeholderSubmissionSent: false,
      externalStakeholderNotified: false,
      description: 'Documentary evidence that no real notification or submission was dispatched.'
    };
  }
}
