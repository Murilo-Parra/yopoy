export class FiscalProductionOperationsDashboardNoOpPlan {
  public static getPlan() {
    return {
      dashboardNoOpPlanGenerated: true,
      realDashboardCreated: false,
      description: 'Modelar dashboard como no-op. Não criar dashboard real.'
    };
  }
}
