export class FiscalProductionExternalIntegrationCommandDenialPlan {
  public static getPlan() {
    return {
      externalIntegrationCommandDenialPlanGenerated: true,
      realSefazCalled: false,
      realExternalApiCalled: false,
      realWebhookSent: false,
      description: 'Negar SEFAZ, API externa, HTTP adapter, callback, webhook e notification provider.'
    };
  }
}
