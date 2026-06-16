export class FiscalProductionFinalStateDisclosureNoNotificationPlan {
  public static getPlan() {
    return {
      disclosureNoNotificationPlanGenerated: true,
      realWebhookSent: false,
      realSlackSent: false,
      realWhatsappSent: false,
      realEmailSent: false,
      realPagerSent: false,
      description: 'Impedir notificações reais.'
    };
  }
}
