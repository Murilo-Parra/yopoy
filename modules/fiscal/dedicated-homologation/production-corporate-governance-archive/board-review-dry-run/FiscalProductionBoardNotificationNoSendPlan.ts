export class FiscalProductionBoardNotificationNoSendPlan {
  public static getPlan() {
    return {
      boardNotificationNoSendPlanGenerated: true,
      realStakeholderNotified: false,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Impedir notificações reais.'
    };
  }
}
