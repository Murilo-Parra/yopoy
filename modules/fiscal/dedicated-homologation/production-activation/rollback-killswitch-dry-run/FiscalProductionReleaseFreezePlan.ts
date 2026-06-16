export class FiscalProductionReleaseFreezePlan {
  public static generatePlan() {
    return {
      releaseFreezePlanGenerated: true,
      releaseFrozen: false,
      description: 'Model of future release freeze. No real release frozen, production flag remains unchanged.'
    };
  }
}
