export class FiscalProductionWarRoomCommunicationNoSendPlan {
  public static getPlan() {
    return {
      warRoomCommunicationNoSendPlanGenerated: true,
      webhookSent: false,
      slackSent: false,
      description: 'Modelar comunicação de war room sem envio. Não notificar operador, SRE, cliente, stakeholder ou aprovador. Não enviar webhook, Slack, WhatsApp, e-mail, PagerDuty ou Opsgenie.'
    };
  }
}
