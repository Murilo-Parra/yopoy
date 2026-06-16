export class FiscalProductionComplianceRollbackShutdownBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'FORCED_REAL_ROLLBACK_DETECTED',
      'FORCED_REAL_SHUTDOWN_DETECTED',
      'FORCED_REAL_KILL_SWITCH_DETECTED',
      'FORCED_TRAFFIC_REVERSION_DETECTED'
    ];
  }
}
