export class FiscalProductionRetentionDriftNoticeNoNotificationPlan {
  public static getPlan() {
    return {
      retentionDriftNoticeNoNotificationPlanGenerated: true,
      realStakeholderNotified: false,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Impedir notificação real sobre drift.'
    };
  }
}
