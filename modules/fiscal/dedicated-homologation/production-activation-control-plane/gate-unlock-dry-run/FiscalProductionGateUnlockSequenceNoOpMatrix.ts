export class FiscalProductionGateUnlockSequenceNoOpMatrix {
  public static getMatrix() {
    return {
      gateUnlockSequenceNoOpMatrixGenerated: true,
      realExecutionGateUnlocked: false,
      realProductionActivationExecuted: false,
      description: 'Modelar sequência de unlock sem execução. Não executar hardUnlock. Não executar produção.'
    };
  }
}
