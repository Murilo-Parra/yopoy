export class FiscalDay2OperationalMonitoringNoOpPlan {
  public static getPlan() {
    return {
      operationalMonitoringNoOpPlanGenerated: true,
      realObservabilityInstalled: false,
      description: 'Modelagem de monitoramento operacional como no-op. Não instala observability real.'
    };
  }
}
