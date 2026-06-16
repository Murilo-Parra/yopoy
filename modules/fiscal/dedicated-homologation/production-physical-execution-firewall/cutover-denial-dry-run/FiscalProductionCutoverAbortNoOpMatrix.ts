export class FiscalProductionCutoverAbortNoOpMatrix {
  public static getMatrix() {
    return {
      cutoverAbortNoOpMatrixGenerated: true,
      realAbortExecuted: false,
      description: 'Modelar abort no-op. Não executar abort real.'
    };
  }
}
