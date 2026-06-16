import { FiscalShadowReplayQueueRepository } from "../FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayBatchRequest, FiscalShadowReplayBatchResult, FiscalShadowReplayBatchStatus } from "./FiscalShadowReplayBatchTypes";
import { FiscalShadowReplayBatchValidator } from "./FiscalShadowReplayBatchValidator";
import { FiscalShadowReplayBatchManualRunner } from "./FiscalShadowReplayBatchManualRunner";
import { FiscalShadowReplayBatchAuditService } from "./FiscalShadowReplayBatchAuditService";
import { FiscalShadowReplayBatchReportService } from "./FiscalShadowReplayBatchReportService";

export class FiscalShadowReplayBatchService {
  private repository: FiscalShadowReplayQueueRepository;
  private validator: FiscalShadowReplayBatchValidator;
  private runner: FiscalShadowReplayBatchManualRunner;
  private auditService: FiscalShadowReplayBatchAuditService;
  private reportService: FiscalShadowReplayBatchReportService;
  
  private batches: Map<string, FiscalShadowReplayBatchResult> = new Map();

  constructor(
      repository: FiscalShadowReplayQueueRepository, 
      runner: FiscalShadowReplayBatchManualRunner,
      auditService: FiscalShadowReplayBatchAuditService,
      reportService: FiscalShadowReplayBatchReportService
  ) {
    this.repository = repository;
    this.runner = runner;
    this.auditService = auditService;
    this.reportService = reportService;
    this.validator = new FiscalShadowReplayBatchValidator();
  }

  public validateBatch(request: FiscalShadowReplayBatchRequest): { valid: boolean; blockers: string[] } {
    const availableItems = this.repository.list();
    const validation = this.validator.validate(request, availableItems);
    
    return {
       valid: validation.valid,
       blockers: validation.blockers
    };
  }

  public simulateBatch(request: FiscalShadowReplayBatchRequest): FiscalShadowReplayBatchResult {
    const availableItems = this.repository.list();
    const validation = this.validator.validate(request, availableItems);
    
    const batchId = `BATCH-${Math.random().toString(36).substring(7)}`;

    if (!validation.valid) {
      const blockedResult: FiscalShadowReplayBatchResult = {
        batchId,
        status: FiscalShadowReplayBatchStatus.BLOCKED,
        totalRequested: request.itemIds.length,
        totalAccepted: 0,
        totalSimulated: 0,
        totalBlocked: request.itemIds.length,
        totalFailedSafe: 0,
        totalSkipped: 0,
        results: [],
        manualOnly: true,
        autoRun: false,
        workerCreated: false,
        captured: false,
        dispatched: false,
        routeToV2: false,
        routeToLegacy: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadPersisted: false,
        rawReturned: false
      };
      this.auditService.logBatchAction(blockedResult, "BATCH_BLOCKED");
      this.batches.set(batchId, blockedResult);
      this.reportService.incrementBatchStats(0, request.itemIds.length, 0);
      return blockedResult;
    }

    const itemResults = this.runner.runManualBatch(validation.validItems);
    
    let totalSimulated = 0;
    let totalFailedSafe = 0;

    for (const res of itemResults) {
        if (res.simulated) totalSimulated++;
        if (res.failedSafe) totalFailedSafe++;
    }

    const result: FiscalShadowReplayBatchResult = {
        batchId,
        status: totalFailedSafe > 0 ? FiscalShadowReplayBatchStatus.PARTIAL_FAILURE : FiscalShadowReplayBatchStatus.SIMULATED,
        totalRequested: request.itemIds.length,
        totalAccepted: validation.validItems.length,
        totalSimulated,
        totalBlocked: 0,
        totalFailedSafe,
        totalSkipped: 0,
        results: itemResults,
        manualOnly: true,
        autoRun: false,
        workerCreated: false,
        captured: false,
        dispatched: false,
        routeToV2: false,
        routeToLegacy: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadPersisted: false,
        rawReturned: false
    };

    this.auditService.logBatchAction(result, "BATCH_SIMULATED");
    this.batches.set(batchId, result);
    this.reportService.incrementBatchStats(totalSimulated, 0, totalFailedSafe);
    return result;
  }

  public getBatch(id: string): FiscalShadowReplayBatchResult | undefined {
    return this.batches.get(id);
  }

  public markReviewed(id: string): boolean {
    const batch = this.batches.get(id);
    if (!batch) return false;
    
    batch.status = FiscalShadowReplayBatchStatus.REVIEWED;
    this.reportService.incrementReviewed();
    this.auditService.logBatchAction({ batchId: id, status: "REVIEWED" }, "BATCH_REVIEWED");
    return true;
  }

  public getReport() {
      return this.reportService.getReport();
  }

  public getAudit() {
      return this.auditService.getBatchAuditRecords();
  }
}
