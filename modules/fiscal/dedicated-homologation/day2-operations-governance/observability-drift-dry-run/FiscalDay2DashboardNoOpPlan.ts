export class FiscalDay2DashboardNoOpPlan {
  public static getPlan() {
    return {
      dashboardNoOpPlanGenerated: true,
      realDashboardCreated: false,
      grafanaConnected: false,
      datadogConnected: false,
      newRelicConnected: false,
      description: 'Modelagem de dashboard day-2 como no-op. Não cria dashboard real. Não conecta Grafana/Datadog/NewRelic.'
    };
  }
}
