import { FiscalShadowReplayItem } from "../FiscalShadowReplayTypes";
import { FiscalShadowReplayManualProcessor } from "../FiscalShadowReplayManualProcessor";
import { FiscalShadowReplayBatchItemResult } from "./FiscalShadowReplayBatchTypes";

export class FiscalShadowReplayBatchManualRunner {
  private processor: FiscalShadowReplayManualProcessor;

  constructor(processor: FiscalShadowReplayManualProcessor) {
    this.processor = processor;
  }

  public runManualBatch(items: FiscalShadowReplayItem[]): FiscalShadowReplayBatchItemResult[] {
    const results: FiscalShadowReplayBatchItemResult[] = [];

    // Ensure synchronous/controlled promise iteration - no background processing
    for (const item of items) {
      try {
        const itemResult = this.processor.simulateItem(item.id);
        
        if (itemResult) {
            results.push({
                itemId: item.id,
                status: "SIMULATED",
                simulated: true,
                blocked: false,
                skipped: false,
                failedSafe: false,
                differenceCount: itemResult.comparison ? itemResult.comparison.differenceCount : 0,
                blockers: [],
                warnings: [],
                payloadPersisted: false,
                rawReturned: false
            });
        } else {
             results.push({
                itemId: item.id,
                status: "FAILED_SAFE",
                simulated: false,
                blocked: false,
                skipped: false,
                failedSafe: true,
                blockers: [],
                warnings: ["Item not found by processor"],
                payloadPersisted: false,
                rawReturned: false
            });
        }
      } catch (e: any) {
        results.push({
            itemId: item.id,
            status: "FAILED_SAFE",
            simulated: false,
            blocked: false,
            skipped: false,
            failedSafe: true,
            blockers: [],
            warnings: [e.message || "Unknown error during simulation"],
            payloadPersisted: false,
            rawReturned: false
        });
      }
    }

    return results;
  }
}
