export class FiscalProductionRuntimeInterlockNoOpContract {
  public static getContract() {
    return {
      runtimeInterlockContractGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      realJobEnqueued: false,
      realWorkerDispatched: false,
      description: 'Modelar contrato de interlock de runtime. Não iniciar queue, job, worker, scheduler, cron, command runner ou shell.'
    };
  }
}
