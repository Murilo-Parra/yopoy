export class FiscalProductionRuntimeWorkerNoOpContract {
  public static generateContract() {
    return {
      workerNoOpContractGenerated: true,
      workersCreated: false,
      schedulersCreated: false,
      cronCreated: false,
      description: 'Modelagem de contrato de worker no-op. Não cria worker real, parser, scheduler, cron, setInterval ou queue.process.'
    };
  }
}
