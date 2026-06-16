export class FiscalProductionStakeholderSubmissionEnvelope {
  public static generateEnvelope() {
    return {
      submissionEnvelopeGenerated: true,
      nonExecutableSubmissionEnvelopeOnly: true,
      realStakeholderSubmissionSent: false,
      externalStakeholderNotified: false,
      description: 'Non-executable submission envelope to stakeholders. Does not send real submissions or notify external stakeholders.'
    };
  }
}
