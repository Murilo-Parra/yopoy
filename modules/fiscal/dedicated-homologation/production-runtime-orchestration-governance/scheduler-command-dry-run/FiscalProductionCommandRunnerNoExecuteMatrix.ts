export class FiscalProductionCommandRunnerNoExecuteMatrix {
  public static getMatrix() {
    return {
      commandRunnerNoExecuteMatrixGenerated: true,
      realCommandRunnerExecuted: false,
      description: 'Modelar command runners como matriz no-execute. Não executar command runner real.'
    };
  }
}
