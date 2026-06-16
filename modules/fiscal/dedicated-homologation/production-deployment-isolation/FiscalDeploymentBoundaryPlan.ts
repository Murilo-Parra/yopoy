export class FiscalDeploymentBoundaryPlan {
  public static generatePlan() {
    return {
      deploymentBoundaryOnly: true,
      realDeployExecuted: false,
      networkProvisioned: false,
      databaseProvisioned: false,
      description: 'Modeled boundaries for future deployment. Real deploy is blocked outside of an explicit future module.'
    };
  }
}
