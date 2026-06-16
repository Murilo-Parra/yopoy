import { FiscalProductionOperationsStakeholderSignatureInput } from './FiscalProductionOperationsStakeholderSignatureTypes';

export class FiscalProductionOperationsStakeholderSignatureValidator {
  public static validate(input: FiscalProductionOperationsStakeholderSignatureInput) {
    const keys = Object.keys(input);
    const hasForceFlag = keys.some(key => key.startsWith('force') && (input as any)[key] === true);

    if (hasForceFlag) {
      throw new Error('As flags force* são estritamente proibidas.');
    }
  }
}
