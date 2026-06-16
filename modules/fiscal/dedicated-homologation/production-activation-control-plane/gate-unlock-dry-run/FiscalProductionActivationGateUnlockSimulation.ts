export class FiscalProductionActivationGateUnlockSimulation {
  public static simulate() {
    return {
      gateUnlockSimulationGenerated: true,
      realExecutionGateUnlocked: false,
      activationBlocked: true,
      description: 'Modelar simulação de unlock do gate. Não destravar gate real.'
    };
  }
}
