export class FiscalDay2IncidentCommunicationNoSendPlan {
  public static getPlan() {
    return {
      incidentCommunicationNoSendPlanGenerated: true,
      emailSent: false,
      slackSent: false,
      whatsappSent: false,
      webhookSent: false,
      description: 'Modelagem de comunicação de incidente sem envio real. Não envia mensagem externa ou interna real.'
    };
  }
}
