export class FiscalDay2AlertRuleNoActivationPlan {
  public static getPlan() {
    return {
      alertRuleNoActivationPlanGenerated: true,
      productionAlertCreated: false,
      realAlertRuleActivated: false,
      slackSent: false,
      webhookSent: false,
      pagerSent: false,
      description: 'Modelagem de alert rules sem ativação. Não cria alerta produtivo. Não ativa alert rule real. Não envia notificação real.'
    };
  }
}
