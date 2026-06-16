export class FiscalDay2OnCallEscalationNoNotificationPlan {
  public static getPlan() {
    return {
      onCallEscalationNoNotificationPlanGenerated: true,
      externalOperatorNotified: false,
      sreNotified: false,
      stakeholderNotified: false,
      customerNotified: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      webhookSent: false,
      pagerSent: false,
      description: 'Modelagem de escalation on-call sem notificação. Não notifica SRE, operador, stakeholder ou cliente. Não envia mensageiro.'
    };
  }
}
