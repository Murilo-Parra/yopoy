export class FiscalProductionOperationalSequenceNoOpMatrix {
  public static getMatrix() {
    return {
      operationalSequenceNoOpMatrixGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      realJobEnqueued: false,
      description: 'Modelagem sequência operacional sem execução real. Não inicia runtime. Não cria worker/queue/job.'
    };
  }
}
