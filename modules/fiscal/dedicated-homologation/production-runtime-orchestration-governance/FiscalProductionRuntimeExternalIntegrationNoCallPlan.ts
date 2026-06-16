export class FiscalProductionRuntimeExternalIntegrationNoCallPlan {
  public static getPlan() {
    return {
      runtimeExternalIntegrationNoCallPlanGenerated: true,
      realSefazCalled: false,
      realWebhookSent: false,
      description: 'Bloquear chamadas externas de runtime, SEFAZ, webhooks e notificações.'
    };
  }
}
