export class FiscalProductionRetentionNoticeNoNotificationPlan {
  public static getPlan() {
    return {
      retentionNoticeNoNotificationPlanGenerated: true,
      realStakeholderNotified: false,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Impedir notificação real.'
    };
  }
}
