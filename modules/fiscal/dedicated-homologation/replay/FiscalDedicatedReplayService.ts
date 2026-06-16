import { FiscalDedicatedReplayValidator } from './FiscalDedicatedReplayValidator';
import { FiscalDedicatedReplayQueueRepository } from './FiscalDedicatedReplayQueueRepository';
import { FiscalDedicatedReplayManualRunner } from './FiscalDedicatedReplayManualRunner';
import { FiscalDedicatedReplayShapeComparator } from './FiscalDedicatedReplayShapeComparator';
import { FiscalDedicatedReplayInput, FiscalDedicatedReplayResult } from './FiscalDedicatedReplayTypes';

export class FiscalDedicatedReplayService {
  public static validate(input: FiscalDedicatedReplayInput): FiscalDedicatedReplayResult {
    return FiscalDedicatedReplayValidator.validate(input);
  }

  public static enqueue(input: FiscalDedicatedReplayInput): Partial<FiscalDedicatedReplayResult> {
    const valRes = this.validate(input);
    if (!valRes.success) return valRes;

    FiscalDedicatedReplayQueueRepository.enqueue(input);
    valRes.queued = true;
    return valRes;
  }

  public static getQueue() {
    return FiscalDedicatedReplayQueueRepository.getQueue();
  }

  public static runOne(id: string): FiscalDedicatedReplayResult {
    return FiscalDedicatedReplayManualRunner.runOne(id);
  }

  public static runBatch(ids: string[]): FiscalDedicatedReplayResult[] {
    return ids.map(id => this.runOne(id));
  }

  public static compareShape(left: any, right: any) {
    return FiscalDedicatedReplayShapeComparator.compare(left, right);
  }
}
