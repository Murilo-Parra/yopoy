export class FiscalProductionOperationsAlertRuleNoActivationPlan {
  public static getPlan() {
    return {
      alertRuleNoActivationPlanGenerated: true,
      productionAlertCreated: false,
      realAlertRuleActivated: false,
      webhookSent: false,
      slackSent: false,
      emailSent: false,
      description: 'Modelar regras de alerta sem ativação. Não criar alerta produtivo. Não ativar regra real. Não enviar notificação.'
    };
  }
}
