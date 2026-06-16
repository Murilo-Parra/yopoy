export class FiscalProductionOperationsNoRealStakeholderNotificationEvidence {
  public static getEvidence() {
    return {
      noRealStakeholderNotificationEvidenceGenerated: true,
      realStakeholderNotified: false,
      realSignerNotified: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      pagerDutySent: false,
      opsgenieSent: false,
      description: 'Evidenciar ausência de notificação real.'
    };
  }
}
