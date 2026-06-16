export class FiscalProductionOperationsGateUnlockSimulationPlan {
  public static getPlan() {
    return {
      gateUnlockSimulationPlanGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      description: 'Modelar simulação de unlock de gate. Não executar unlock real. Não emitir token real de autorização.'
    };
  }
}
