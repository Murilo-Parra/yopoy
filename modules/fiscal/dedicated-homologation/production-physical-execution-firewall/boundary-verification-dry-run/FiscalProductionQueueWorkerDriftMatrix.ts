export class FiscalProductionQueueWorkerDriftMatrix {
  public static getMatrix() {
    return {
      queueWorkerDriftMatrixGenerated: true,
      realQueueProbed: false,
      realWorkerProbed: false,
      realSchedulerProbed: false,
      realCronProbed: false,
      description: 'Simular drift de queue, job, worker, scheduler e cron. Não consultar fila real. Não iniciar worker real.'
    };
  }
}
