export class FiscalShadowMetrics {
  public static totalRuns: number = 0;
  public static matchedCount: number = 0;
  public static divergedCount: number = 0;
  public static failedCount: number = 0;
  public static droppedCount: number = 0;
  public static totalDurationMs: number = 0;

  public static byRoute: Record<string, number> = {};
  public static byOperation: Record<string, number> = {};
  public static bySeverity: Record<string, number> = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    BLOCKER: 0
  };

  public static incrementDropped() {
    this.droppedCount++;
  }

  public static incrementFailed() {
    this.failedCount++;
    this.totalRuns++;
  }

  public static recordSuccess(route: string, operation: string, matched: boolean, durationMs: number, severity?: string | null) {
    this.totalRuns++;
    this.totalDurationMs += durationMs;

    this.byRoute[route] = (this.byRoute[route] || 0) + 1;
    this.byOperation[operation] = (this.byOperation[operation] || 0) + 1;

    if (matched) {
      this.matchedCount++;
    } else {
      this.divergedCount++;
      if (severity && this.bySeverity[severity] !== undefined) {
        this.bySeverity[severity]++;
      }
    }
  }

  public static getAverageDuration(): number {
    if (this.totalRuns === 0) return 0;
    return Math.round(this.totalDurationMs / this.totalRuns);
  }

  public static getReport() {
    return {
      totalRuns: this.totalRuns,
      matched: this.matchedCount,
      diverged: this.divergedCount,
      failed: this.failedCount,
      dropped: this.droppedCount,
      bySeverity: this.bySeverity,
      byRoute: this.byRoute,
      byOperation: this.byOperation,
      averageDurationMs: this.getAverageDuration()
    };
  }

  public static reset() {
    this.totalRuns = 0;
    this.matchedCount = 0;
    this.divergedCount = 0;
    this.failedCount = 0;
    this.droppedCount = 0;
    this.totalDurationMs = 0;
    this.byRoute = {};
    this.byOperation = {};
    this.bySeverity = { LOW: 0, MEDIUM: 0, HIGH: 0, BLOCKER: 0 };
  }
}
