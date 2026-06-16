export class FiscalRouteSandboxNetworkPlan {
  public static generatePlan() {
    return {
      networkPlanGenerated: true,
      networkProvisioned: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Future isolated network plan. No real network is provisioned.'
    };
  }
}
