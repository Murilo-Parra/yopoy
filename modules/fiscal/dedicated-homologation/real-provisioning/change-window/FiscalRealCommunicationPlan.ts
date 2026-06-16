export class FiscalRealCommunicationPlan {
  public static getPlan() {
    return [
      {
        audience: 'C-Level / Diretoria',
        channel: 'E-mail / Status Page Interna',
        ownerRole: 'PM / Tech Lead Infra',
        messageType: 'Start/End of Change Window',
        externalNotificationSent: false,
        customerImpact: false,
        realChangeAnnounced: false
      },
      {
        audience: 'Equipe de Suporte N3',
        channel: 'Slack/Teams (Canal Dedicado)',
        ownerRole: 'Incident Manager',
        messageType: 'Contingency Alerts / Real-time progress',
        externalNotificationSent: false,
        customerImpact: false,
        realChangeAnnounced: false
      }
    ];
  }
}
