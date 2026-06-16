export class FiscalRealVaultAuditPolicyValidator {
  public static validate(policy: any): any {
    const blockers: string[] = [];
    const strObj = JSON.stringify(policy || {});

    if (strObj.match(/password|token|privateKey/i) && strObj.length > 50) {
      blockers.push('Validator blocked sensitive data.');
    }

    return {
      validationPassed: blockers.length === 0,
      blockers,
      auditTrailPlanned: true,
      logSinkPlanned: true,
      alertsPlanned: true,
      auditSinkActivated: false
    };
  }
}
