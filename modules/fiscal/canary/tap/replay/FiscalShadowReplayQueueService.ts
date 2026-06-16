import { FiscalShadowReplayItem, FiscalShadowReplayEnqueueResult, FiscalShadowReplayItemStatus } from "./FiscalShadowReplayTypes";
import { FiscalShadowReplayQueueRepository } from "./FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayQueueValidator } from "./FiscalShadowReplayQueueValidator";
import { FiscalShadowTapSanitizer } from "../FiscalShadowTapSanitizer";
import { FiscalShadowReplayAuditService } from "./FiscalShadowReplayAuditService";

export class FiscalShadowReplayQueueService {
  private repository: FiscalShadowReplayQueueRepository;
  private validator: FiscalShadowReplayQueueValidator;
  private sanitizer: FiscalShadowTapSanitizer;
  private auditService: FiscalShadowReplayAuditService;

  constructor(repository: FiscalShadowReplayQueueRepository, auditService: FiscalShadowReplayAuditService) {
    this.repository = repository;
    this.auditService = auditService;
    this.validator = new FiscalShadowReplayQueueValidator();
    this.sanitizer = new FiscalShadowTapSanitizer();
  }

  public enqueueManualSnapshot(input: any): FiscalShadowReplayEnqueueResult {
    const validation = this.validator.validate(input);
    const warnings: string[] = [];

    const itemId = `REPLAY-${Math.random().toString(36).substring(7)}`;

    if (!validation.valid) {
      warnings.push("Snapshot blocked by validation");
      // Could enqueue as BLOCKED without payload, or reject. The spec says:
      // "não enfileirar ou enfileirar como BLOCKED sem payload."
      this.repository.enqueue({
          id: itemId,
          method: input.method || "UNKNOWN",
          route: input.route || "UNKNOWN",
          operation: input.operation || "UNKNOWN",
          status: FiscalShadowReplayItemStatus.BLOCKED,
          createdAt: new Date().toISOString(),
          sanitized: true,
          payloadPersisted: false,
          rawReturned: false,
          simulationOnly: true,
          activationBlocked: true
      });
      
      const resultBlocked: FiscalShadowReplayEnqueueResult = {
        enqueued: true,
        itemId: itemId,
        status: FiscalShadowReplayItemStatus.BLOCKED,
        sanitized: true,
        payloadPersisted: false,
        rawReturned: false,
        simulationOnly: true,
        activationBlocked: true,
        blockers: validation.blockers,
        warnings
      };
      
      this.auditService.logReplayAction(resultBlocked, "ENQUEUE_BLOCKED");
      return resultBlocked;
    }

    const sanitizedSnapshot = this.sanitizer.sanitizeSnapshot(input);

    const item: FiscalShadowReplayItem = {
      id: itemId,
      method: sanitizedSnapshot.method as string,
      route: sanitizedSnapshot.route as string,
      operation: sanitizedSnapshot.operation as string,
      companyId: sanitizedSnapshot.companyId,
      userId: sanitizedSnapshot.userId,
      requestShape: sanitizedSnapshot.requestShape,
      responseShape: sanitizedSnapshot.responseShape,
      v2Shape: sanitizedSnapshot.v2Shape,
      status: FiscalShadowReplayItemStatus.QUEUED,
      createdAt: new Date().toISOString(),
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false,
      simulationOnly: true,
      activationBlocked: true
    };

    this.repository.enqueue(item);

    const result: FiscalShadowReplayEnqueueResult = {
      enqueued: true,
      itemId: item.id,
      status: FiscalShadowReplayItemStatus.QUEUED,
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false,
      simulationOnly: true,
      activationBlocked: true,
      blockers: [],
      warnings: []
    };

    this.auditService.logReplayAction(result, "ENQUEUE");

    return result;
  }

  public listQueue(filters: any = {}): FiscalShadowReplayItem[] {
    // Sanitized queue, omit any potential payload just in case (already sanitized though)
    return this.repository.list(filters).map(item => ({...item}));
  }

  public getItem(id: string): FiscalShadowReplayItem | undefined {
    return this.repository.getById(id);
  }

  public markSkipped(id: string, reason: string): boolean {
    const item = this.repository.getById(id);
    if (!item) return false;

    this.repository.updateStatus(id, FiscalShadowReplayItemStatus.SKIPPED);
    this.auditService.logReplayAction({ itemId: id, reason, matched: true, differenceCount: 0 }, "MARK_SKIPPED");
    return true;
  }

  public validateItem(input: any): any {
    return this.validator.validate(input);
  }
}
