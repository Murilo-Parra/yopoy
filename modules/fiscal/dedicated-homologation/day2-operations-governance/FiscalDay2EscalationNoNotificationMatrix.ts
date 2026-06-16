export class FiscalDay2EscalationNoNotificationMatrix {
  public static getMatrix() {
    return {
      escalationNoNotificationMatrixGenerated: true,
      externalOperatorNotified: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      webhookSent: false,
      description: 'Modelagem de matriz de escalonamento sem notificação real. Não envia Slack, WhatsApp, e-mail ou webhook.'
    };
  }
}
