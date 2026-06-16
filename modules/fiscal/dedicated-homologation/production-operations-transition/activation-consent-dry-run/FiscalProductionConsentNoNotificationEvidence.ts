export class FiscalProductionConsentNoNotificationEvidence {
  public static getEvidence() {
    return {
      noNotificationEvidenceGenerated: true,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      pagerSent: false,
      description: 'Evidencia ausência de notificação real. Não envia ferramentas reais.'
    };
  }
}
