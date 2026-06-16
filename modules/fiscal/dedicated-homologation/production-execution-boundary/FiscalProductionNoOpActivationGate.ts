export class FiscalProductionNoOpActivationGate {
  public static generateGate() {
    return {
      noOpActivationGateGenerated: true,
      noOpActivationGateOnly: true,
      realExecutionGateUnlocked: false,
      activationBlocked: true,
      description: 'Modeled no-op activation gate. Does not unlock real gate, does not execute callbacks, workers, or schedulers.'
    };
  }
}
