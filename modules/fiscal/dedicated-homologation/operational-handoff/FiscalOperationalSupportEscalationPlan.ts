export class FiscalOperationalSupportEscalationPlan {
  public static generatePlan() {
    return {
      supportEscalationGenerated: true,
      externalOperatorNotified: false,
      emailsSent: 0,
      webhooksTriggered: 0,
      slackMessagesSent: 0,
      whatsappMessagesSent: 0,
      description: 'Model of future escalation. No email, webhook, Slack, WhatsApp or real messages sent.'
    };
  }
}
