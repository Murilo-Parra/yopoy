export class FiscalProductionRuntimeQueueUnlockSimulation {
  public static generateSimulation() {
    return {
      queueUnlockSimulationGenerated: true,
      realQueueUnlocked: false,
      commandQueueStarted: false,
      description: 'Modelagem da simulação administrativa de unlock da queue. Não destrava queue real.'
    };
  }
}
