export class FiscalProductionFinalStateReconciliationSimulationMatrix {
  public static getMatrix() {
    return {
      reconciliationSimulationMatrixGenerated: true,
      realDataReconciled: false,
      description: 'Simular reconciliação entre ledger virtual, snapshot virtual e attestation virtual. Não reconciliar dados reais.'
    };
  }
}
