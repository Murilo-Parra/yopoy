export class FiscalProductionExecutionDenialNoOpMatrix {
  public static getMatrix() {
    return {
      executionDenialNoOpMatrixGenerated: true,
      realGoLiveExecuted: false,
      realRuntimeStarted: false,
      realShellCommandExecuted: false,
      description: 'Negar execução real de go-live, ativação, runtime, shell e command runner.'
    };
  }
}
