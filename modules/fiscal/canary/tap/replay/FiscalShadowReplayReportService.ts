import { FiscalShadowReplayQueueRepository } from "./FiscalShadowReplayQueueRepository";
import { FiscalShadowReplayReport, FiscalShadowReplayItemStatus } from "./FiscalShadowReplayTypes";

export class FiscalShadowReplayReportService {
  private repository: FiscalShadowReplayQueueRepository;

  constructor(repository: FiscalShadowReplayQueueRepository) {
    this.repository = repository;
  }

  public getReport(): FiscalShadowReplayReport {
    const all = this.repository.getAll();
    let queued = 0;
    let validated = 0;
    let simulated = 0;
    let skipped = 0;
    let blocked = 0;
    let failedSafe = 0;

    for (const item of all) {
      if (item.status === FiscalShadowReplayItemStatus.QUEUED) queued++;
      else if (item.status === FiscalShadowReplayItemStatus.VALIDATED) validated++;
      else if (item.status === FiscalShadowReplayItemStatus.SIMULATED) simulated++;
      else if (item.status === FiscalShadowReplayItemStatus.SKIPPED) skipped++;
      else if (item.status === FiscalShadowReplayItemStatus.BLOCKED) blocked++;
      else if (item.status === FiscalShadowReplayItemStatus.FAILED_SAFE) failedSafe++;
    }

    return {
      generatedAt: new Date().toISOString(),
      totalQueued: queued,
      totalValidated: validated,
      totalSimulated: simulated,
      totalSkipped: skipped,
      totalBlocked: blocked,
      totalFailedSafe: failedSafe,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
