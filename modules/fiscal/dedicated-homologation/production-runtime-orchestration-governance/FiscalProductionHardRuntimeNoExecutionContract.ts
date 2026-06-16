export class FiscalProductionHardRuntimeNoExecutionContract {
  public static getContract() {
    return {
      hardRuntimeNoExecutionContractGenerated: true,
      realQueueStarted: false,
      realJobEnqueued: false,
      realWorkerDispatched: false,
      description: 'Definir contrato rígido de não execução de runtime. Bloquear queue, job, worker, scheduler, cron, shell, command runner, lifecycle runner e transaction runner reais.'
    };
  }
}
