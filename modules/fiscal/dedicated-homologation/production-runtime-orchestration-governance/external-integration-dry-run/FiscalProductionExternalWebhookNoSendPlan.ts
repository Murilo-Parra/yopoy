export class FiscalProductionExternalWebhookNoSendPlan {
  public static getPlan() {
    return {
      externalWebhookNoSendPlanGenerated: true,
      realWebhookSent: false,
      realCallbackRegistered: false,
      description: 'Modelar webhooks sem envio real. Não registrar callback real.'
    };
  }
}
