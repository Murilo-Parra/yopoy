export class FiscalOperationalAlertingDryRunPlan {
  public static generatePlan() {
    return {
      alertingPlanGenerated: true,
      productionAlertCreated: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      description: 'Model of future alerts. No real notifications sent.'
    };
  }
}
