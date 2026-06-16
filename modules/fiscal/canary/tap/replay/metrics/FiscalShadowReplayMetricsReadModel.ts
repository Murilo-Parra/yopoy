import { FiscalShadowReplayQueueRepository } from "../FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayBatchService } from "../batch/FiscalShadowReplayBatchService";

export class FiscalShadowReplayMetricsReadModel {
  private repository: FiscalShadowReplayQueueRepository;
  private batchService: FiscalShadowReplayBatchService;

  constructor(repository: FiscalShadowReplayQueueRepository, batchService: FiscalShadowReplayBatchService) {
    this.repository = repository;
    this.batchService = batchService;
  }

  public getQueueSnapshot() {
    return this.repository.getAll().map(i => ({
         id: i.id,
         route: i.route,
         method: i.method,
         operation: i.operation,
         status: i.status,
         createdAt: i.createdAt,
         sanitized: true,
         simulationOnly: true,
         activationBlocked: true,
         readOnly: true
    }));
  }

  public getBatchReportSnapshot() {
    return this.batchService.getReport();
  }
}
