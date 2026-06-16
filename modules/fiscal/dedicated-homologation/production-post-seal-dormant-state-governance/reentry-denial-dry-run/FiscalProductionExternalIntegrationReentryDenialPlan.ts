export class FiscalProductionExternalIntegrationReentryDenialPlan {
  public static getPlan() {
    return {
      externalIntegrationReentryDenialPlanGenerated: true,
      realExternalIntegrationResumed: false,
      realSefazCalled: false,
      realExternalApiCalled: false,
      description: 'Negar retomada de integração externa.'
    };
  }
}
