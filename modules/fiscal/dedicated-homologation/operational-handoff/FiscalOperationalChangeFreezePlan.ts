export class FiscalOperationalChangeFreezePlan {
  public static generatePlan() {
    return {
      changeFreezeGenerated: true,
      releaseFrozen: false,
      trafficChanged: false,
      productiveFlagsChanged: false,
      description: 'Model of future change freeze. Real release not frozen. No productive flags altered.'
    };
  }
}
