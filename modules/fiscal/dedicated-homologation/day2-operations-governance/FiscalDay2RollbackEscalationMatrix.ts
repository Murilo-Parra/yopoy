export class FiscalDay2RollbackEscalationMatrix {
  public static getMatrix() {
    return {
      rollbackEscalationMatrixGenerated: true,
      realRollbackExecuted: false,
      description: 'Modelagem de matriz de rollback escalation. Não executa rollback real.'
    };
  }
}
