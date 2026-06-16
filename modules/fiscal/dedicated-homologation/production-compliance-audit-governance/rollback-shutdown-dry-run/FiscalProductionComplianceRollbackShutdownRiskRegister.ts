export class FiscalProductionComplianceRollbackShutdownRiskRegister {
  public static getRisks(): string[] {
    return [
      'ACCIDENTAL_REAL_ROLLBACK_DUE_TO_MISCONFIGURATION',
      'ACCIDENTAL_SHUTDOWN_DUE_TO_MISCONFIGURATION',
      'ACCIDENTAL_TRAFFIC_CHANGE',
      'DATA_LOSS_DURING_FALSE_ROLLBACK'
    ];
  }
}
