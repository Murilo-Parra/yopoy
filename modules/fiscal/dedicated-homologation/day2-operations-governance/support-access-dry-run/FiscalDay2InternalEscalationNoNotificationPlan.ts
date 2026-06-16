export class FiscalDay2InternalEscalationNoNotificationPlan {
  public static getPlan() {
    return {
      internalEscalationNoNotificationPlanGenerated: true,
      externalOperatorNotified: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      webhookSent: false,
      description: 'Modelagem de escalation interno sem notificação real. Não envia Slack, WhatsApp, e-mail ou webhook.'
    };
  }
}
