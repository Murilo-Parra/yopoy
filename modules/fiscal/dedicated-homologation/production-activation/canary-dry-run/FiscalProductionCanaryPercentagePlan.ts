export class FiscalProductionCanaryPercentagePlan {
  public static generatePlan(intendedCanaryPercentage?: number) {
    return {
      percentagePlanGenerated: true,
      canaryActivated: false,
      intendedPercentage: intendedCanaryPercentage || 0,
      realRolloutApplied: false,
      maxAllowedDryRunPercentage: 99,
      description: 'Canary percentage plan modeled. Real rollout is blocked. 100% rollout blocked in dry-run.'
    };
  }
}
