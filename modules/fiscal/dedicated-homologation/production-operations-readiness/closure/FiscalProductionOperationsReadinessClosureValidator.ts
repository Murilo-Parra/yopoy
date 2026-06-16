import { FiscalProductionOperationsReadinessClosureInput } from './FiscalProductionOperationsReadinessClosureTypes';

export class FiscalProductionOperationsReadinessClosureValidator {
  public static validate(input: FiscalProductionOperationsReadinessClosureInput): void {
    const keys = Object.keys(input);
    const hasForceFlag = keys.some(key => key.startsWith('force') && (input as any)[key] === true);

    if (hasForceFlag) {
      throw new Error('As flags force* são estritamente proibidas.');
    }
  }
}
