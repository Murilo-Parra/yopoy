export class FiscalDeploymentPackageBoundaryPlan {
  public static generatePlan() {
    return {
      packageBoundaryPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      productionV2Activated: false,
      description: 'Modeled boundary of the deployment package. No traffic change or production activation occurs.'
    };
  }
}
