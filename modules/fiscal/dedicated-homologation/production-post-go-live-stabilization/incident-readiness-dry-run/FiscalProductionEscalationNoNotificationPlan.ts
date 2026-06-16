export class FiscalProductionEscalationNoNotificationPlan {
  public static getPlan() {
    return {
      escalationNoNotificationPlanGenerated: true,
      pagerDutySent: false,
      opsgenieSent: false,
      description: 'Modelar escalonamento sem notificação. Não enviar PagerDuty, Opsgenie, Slack, e-mail ou webhook.'
    };
  }
}
