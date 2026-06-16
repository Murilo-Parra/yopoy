import { FiscalDedicatedReplaySanitizer } from './FiscalDedicatedReplaySanitizer';
import { randomUUID } from 'crypto';

export class FiscalDedicatedReplayQueueRepository {
  private static queue: any[] = [];

  public static enqueue(input: any) {
    if (this.queue.length >= 100) {
      this.queue.shift(); // Keep max 100 items
    }
    const sanitizedShape = FiscalDedicatedReplaySanitizer.sanitize(input.safeShape || {});
    const item = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      scenarioId: input.scenarioId || 'UNKNOWN',
      domain: input.domain || 'FULL_STACK',
      safeShape: sanitizedShape,
      syntheticOnly: true,
      queued: true,
      realTrafficCaptured: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
    this.queue.push(item);
    return item;
  }

  public static getQueue() {
    return this.queue;
  }

  public static findById(id: string) {
     return this.queue.find(item => item.id === id);
  }

  public static clear() {
    this.queue = [];
  }
}
