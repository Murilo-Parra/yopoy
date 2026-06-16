export class FiscalProductionNoRealBoardNotificationEvidence {
  public static getEvidence() {
    return {
      noRealBoardNotificationEvidenceGenerated: true,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Evidenciar que nenhuma notificação real foi enviada.'
    };
  }
}
