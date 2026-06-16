export class FiscalProductionOperationsIncidentCommunicationNoSendPlan {
  public static getPlan() {
    return {
      incidentCommunicationNoSendPlanGenerated: true,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      pagerSent: false,
      pagerDutySent: false,
      opsgenieSent: false,
      description: 'Modelar comunicação sem envio real. Não enviar Slack, WhatsApp, e-mail, webhook, pager, PagerDuty ou Opsgenie.'
    };
  }
}
