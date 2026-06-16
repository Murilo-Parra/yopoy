import { FiscalDedicatedReplayPolicy } from './FiscalDedicatedReplayPolicy';
import { FiscalDedicatedReplayQueueRepository } from './FiscalDedicatedReplayQueueRepository';
import { FiscalDedicatedReplayResult, FiscalDedicatedReplayDomain } from './FiscalDedicatedReplayTypes';

export class FiscalDedicatedReplayManualRunner {
  public static runOne(id: string): FiscalDedicatedReplayResult {
    const item = FiscalDedicatedReplayQueueRepository.findById(id);
    const domain = item ? item.domain : FiscalDedicatedReplayDomain.FULL_STACK;
    const result = FiscalDedicatedReplayPolicy.getBaseResult(domain);

    if (!item) {
       result.success = false;
       result.warnings.push(`Item ${id} not found in queue.`);
       return result;
    }

    result.replayExecuted = true; // apenas sintético
    result.processedManually = true;

    return result;
  }
}
