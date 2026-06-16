export class FiscalProductionNoRealDisclosureNotificationEvidence {
  public static getEvidence() {
    return {
      noRealDisclosureNotificationEvidenceGenerated: true,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Evidenciar que nenhuma notificação real foi enviada.'
    };
  }
}
