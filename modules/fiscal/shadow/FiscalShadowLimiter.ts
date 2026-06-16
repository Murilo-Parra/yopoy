export class FiscalShadowLimiter {
  private static activeCount = 0;
  
  public static canExecute(): boolean {
    const maxConcurrency = parseInt(process.env.FISCAL_SHADOW_MAX_CONCURRENCY || "3", 10);
    if (this.activeCount >= maxConcurrency) {
      return false;
    }
    return true;
  }

  public static acquire() {
    this.activeCount++;
  }

  public static release() {
    if (this.activeCount > 0) {
      this.activeCount--;
    }
  }

  public static getActiveCount(): number {
    return this.activeCount;
  }
  
  public static reset() {
    this.activeCount = 0;
  }
}
