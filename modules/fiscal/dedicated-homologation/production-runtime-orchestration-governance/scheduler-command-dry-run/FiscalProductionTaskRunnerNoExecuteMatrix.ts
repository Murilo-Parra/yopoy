export class FiscalProductionTaskRunnerNoExecuteMatrix {
  public static getMatrix() {
    return {
      taskRunnerNoExecuteMatrixGenerated: true,
      realTaskRunnerExecuted: false,
      description: 'Modelar task runners como no-execute. Não executar task real.'
    };
  }
}
