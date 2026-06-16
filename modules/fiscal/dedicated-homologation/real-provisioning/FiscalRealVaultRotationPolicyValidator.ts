export class FiscalRealVaultRotationPolicyValidator {
  public static validate(policy: any): any {
    const blockers: string[] = [];
    const strObj = JSON.stringify(policy || {});

    if (strObj.match(/password|token|privateKey/i) && strObj.length > 50) {
      blockers.push('Validator blocked sensitive data.');
    }

    return {
      validationPassed: blockers.length === 0,
      blockers,
      rotationPlanned: true,
      expirationPlanned: true,
      alertPlanned: true,
      rotationActivated: false
    };
  }
}
