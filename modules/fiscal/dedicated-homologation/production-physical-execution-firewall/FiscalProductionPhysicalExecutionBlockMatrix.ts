export class FiscalProductionPhysicalExecutionBlockMatrix {
  public static getMatrix() {
    return {
      physicalExecutionBlockMatrixGenerated: true,
      physicalRuntimeExecuted: false,
      approvedForRealPhysicalExecution: false,
      description: 'Modelar matriz de bloqueio de execução física. Não executar ativação real. Não executar produção real.'
    };
  }
}
