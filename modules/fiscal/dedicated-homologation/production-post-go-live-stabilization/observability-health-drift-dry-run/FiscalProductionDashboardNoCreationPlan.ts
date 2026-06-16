export class FiscalProductionDashboardNoCreationPlan {
  public static getPlan() {
    return {
      dashboardNoCreationPlanGenerated: true,
      realDashboardCreated: false,
      grafanaConnected: false,
      description: 'Modelar dashboard sem criação real. Não conectar Grafana, Datadog ou New Relic.'
    };
  }
}
