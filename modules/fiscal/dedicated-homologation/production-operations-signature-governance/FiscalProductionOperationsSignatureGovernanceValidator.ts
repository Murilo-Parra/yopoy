import { FiscalProductionOperationsSignatureGovernanceInput } from './FiscalProductionOperationsSignatureGovernanceTypes';

export class FiscalProductionOperationsSignatureGovernanceValidator {
  public static validate(input: FiscalProductionOperationsSignatureGovernanceInput) {
    const keys = Object.keys(input);
    const hasForceFlag = keys.some(key => key.startsWith('force') && (input as any)[key] === true);

    if (hasForceFlag) {
      throw new Error('As flags force* são estritamente proibidas.');
    }
  }
}
