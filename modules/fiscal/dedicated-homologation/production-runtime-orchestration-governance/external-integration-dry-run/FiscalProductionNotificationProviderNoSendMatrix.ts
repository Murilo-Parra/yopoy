export class FiscalProductionNotificationProviderNoSendMatrix {
  public static getMatrix() {
    return {
      notificationProviderNoSendMatrixGenerated: true,
      realSlackSent: false,
      realWhatsappSent: false,
      realEmailSent: false,
      realPagerSent: false,
      description: 'Modelar notification providers sem envio. Bloquear Slack, WhatsApp, e-mail, PagerDuty e Opsgenie reais.'
    };
  }
}
