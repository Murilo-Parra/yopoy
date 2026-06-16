export class FiscalProductionFinalStateDisclosureNoExternalSubmissionPlan {
  public static getPlan() {
    return {
      disclosureNoExternalSubmissionPlanGenerated: true,
      realExternalAuditorSubmissionSent: false,
      realRegulatorSubmissionSent: false,
      realExternalApiCalled: false,
      description: 'Impedir submissão externa real.'
    };
  }
}
