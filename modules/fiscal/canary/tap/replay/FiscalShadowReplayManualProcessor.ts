import { FiscalShadowReplayQueueRepository } from "./FiscalShadowReplayQueueRepository";
import { FiscalShadowReplaySimulationResult, FiscalShadowReplayItemStatus } from "./FiscalShadowReplayTypes";
import { FiscalShadowReplayAuditService } from "./FiscalShadowReplayAuditService";
import { FiscalShadowTapManualComparisonService } from "../FiscalShadowTapManualComparisonService";

export class FiscalShadowReplayManualProcessor {
  private repository: FiscalShadowReplayQueueRepository;
  private auditService: FiscalShadowReplayAuditService;
  private comparisonService: FiscalShadowTapManualComparisonService;

  constructor(repository: FiscalShadowReplayQueueRepository, auditService: FiscalShadowReplayAuditService) {
    this.repository = repository;
    this.auditService = auditService;
    this.comparisonService = new FiscalShadowTapManualComparisonService();
  }

  public simulateItem(id: string): FiscalShadowReplaySimulationResult | null {
    const item = this.repository.getById(id);
    if (!item) return null;

    let comparison = null;
    let newStatus = FiscalShadowReplayItemStatus.SIMULATED;

    try {
        if (item.responseShape && item.v2Shape) {
            comparison = this.comparisonService.compareSnapshot(
                { responseShape: item.responseShape },
                { responseShape: item.v2Shape }
            );
        }
    } catch(e) {
        newStatus = FiscalShadowReplayItemStatus.FAILED_SAFE;
    }

    this.repository.updateStatus(id, newStatus);

    const result: FiscalShadowReplaySimulationResult = {
      itemId: id,
      simulated: true,
      captured: false,
      dispatched: false,
      routeToV2: false,
      routeToLegacy: true,
      legacyResponseOfficial: true,
      v2ResponseOfficial: false,
      comparison,
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false,
      simulationOnly: true,
      activationBlocked: true
    };

    this.auditService.logReplayAction(result, "SIMULATE_ITEM");

    return result;
  }
}
