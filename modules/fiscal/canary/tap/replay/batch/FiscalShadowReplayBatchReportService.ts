import { FiscalShadowReplayBatchReport } from "./FiscalShadowReplayBatchTypes";

export class FiscalShadowReplayBatchReportService {
  private totalBatches = 0;
  private totalItemsSimulated = 0;
  private totalBlocked = 0;
  private totalFailedSafe = 0;
  private totalReviewed = 0;

  public incrementBatchStats(itemsSimulated: number, blocked: number, failedSafe: number) {
    this.totalBatches++;
    this.totalItemsSimulated += itemsSimulated;
    this.totalBlocked += blocked;
    this.totalFailedSafe += failedSafe;
  }

  public incrementReviewed() {
      this.totalReviewed++;
  }

  public getReport(): FiscalShadowReplayBatchReport {
    return {
      generatedAt: new Date().toISOString(),
      totalBatches: this.totalBatches,
      totalItemsSimulated: this.totalItemsSimulated,
      totalBlocked: this.totalBlocked,
      totalFailedSafe: this.totalFailedSafe,
      totalReviewed: this.totalReviewed,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
