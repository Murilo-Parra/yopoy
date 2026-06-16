export class FiscalDay2AlertingNoOpPlan {
  public static getPlan() {
    return {
      alertingNoOpPlanGenerated: true,
      productionAlertCreated: false,
      description: 'Modelagem de alerting como no-op. Não cria alerta produtivo.'
    };
  }
}
