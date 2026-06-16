export class FiscalProductionExternalIntegrationResumptionBlockedPlan {
  public static getPlan() {
    return {
      externalIntegrationResumptionBlockedPlanGenerated: true,
      realExternalIntegrationResumed: false,
      realSefazCalled: false,
      realExternalApiCalled: false,
      description: 'Bloquear retomada de integração externa.'
    };
  }
}
