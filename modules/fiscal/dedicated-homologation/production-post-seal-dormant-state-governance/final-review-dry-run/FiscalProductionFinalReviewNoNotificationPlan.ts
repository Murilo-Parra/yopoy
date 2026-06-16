export class FiscalProductionFinalReviewNoNotificationPlan {
  public static getPlan() {
    return {
      finalReviewNoNotificationPlanGenerated: true,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      realStakeholderNotified: false,
      description: 'Plano de ausência de notificação.'
    };
  }
}
