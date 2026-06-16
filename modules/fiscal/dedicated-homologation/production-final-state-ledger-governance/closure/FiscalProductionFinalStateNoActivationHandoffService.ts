export class FiscalProductionFinalStateNoActivationHandoffService {
  public static simulateHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realGoLiveApproved: false,
      realGoLiveExecuted: false,
      productionV2Activated: false,
      description: 'Simular handoff final sem ativação.'
    };
  }
}
