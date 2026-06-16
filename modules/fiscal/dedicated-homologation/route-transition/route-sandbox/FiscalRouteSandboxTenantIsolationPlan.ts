export class FiscalRouteSandboxTenantIsolationPlan {
  public static generatePlan() {
    return {
      tenantIsolationPlanGenerated: true,
      tenantIsolationCreated: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Future isolated tenant configuration. No real tenant is created.'
    };
  }
}
