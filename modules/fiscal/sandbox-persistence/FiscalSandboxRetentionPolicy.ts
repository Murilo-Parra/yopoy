export class FiscalSandboxRetentionPolicy {
  public static readonly DEFAULT_TTL_DAYS = 7;
  public static readonly RETAINED_STATUS = 'RETAIN_FOR_ANALYSIS';
  public static readonly ELIGIBLE_STATUS = 'ELIGIBLE_FOR_CLEANUP';
  public static readonly EXPIRED_STATUS = 'EXPIRED';

  public static isRetentionExpired(createdAt: Date, customTtlDays?: number): boolean {
    const ageMs = Date.now() - createdAt.getTime();
    const ttlMs = (customTtlDays || this.DEFAULT_TTL_DAYS) * 24 * 60 * 60 * 1000;
    return ageMs >= ttlMs;
  }

  public static getCleanupEligibleStatuses(): string[] {
    return [
      this.ELIGIBLE_STATUS, 
      this.EXPIRED_STATUS, 
      'CLEANED', 
      'STORE_MANUAL_SNAPSHOT', 
      'STORED',
      'REVIEWED'
    ]; 
  }

  public static isCleanupBlocked(status: string): boolean {
    // We block cleanup if explicitly retained
    return status === this.RETAINED_STATUS;
  }
}
