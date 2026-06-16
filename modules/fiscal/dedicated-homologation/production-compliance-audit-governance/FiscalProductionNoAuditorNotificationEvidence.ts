export class FiscalProductionNoAuditorNotificationEvidence {
  public static getEvidence() {
    return {
      noAuditorNotificationEvidenceGenerated: true,
      realAuditorNotified: false,
      realAuditorPackageSent: false,
      webhookSent: false,
      emailSent: false,
      description: 'Evidenciar ausência de notificação de auditor real.'
    };
  }
}
