import { FiscalProductionComplianceRollbackShutdownInput } from './FiscalProductionComplianceRollbackShutdownTypes';

export class FiscalProductionComplianceRollbackShutdownValidator {
  public static validate(input: FiscalProductionComplianceRollbackShutdownInput): string[] {
    const errors: string[] = [];
    if (input.forceExecuteRealRollback) errors.push('forceExecuteRealRollback is not allowed');
    if (input.forceExecuteRealV2Shutdown) errors.push('forceExecuteRealV2Shutdown is not allowed');
    if (input.forceActivateRealKillSwitch) errors.push('forceActivateRealKillSwitch is not allowed');
    if (input.forceChangeRealTraffic) errors.push('forceChangeRealTraffic is not allowed');
    if (input.forcePersistRealRollbackRecord) errors.push('forcePersistRealRollbackRecord is not allowed');
    if (input.forcePersistRealShutdownRecord) errors.push('forcePersistRealShutdownRecord is not allowed');
    return errors;
  }
}
