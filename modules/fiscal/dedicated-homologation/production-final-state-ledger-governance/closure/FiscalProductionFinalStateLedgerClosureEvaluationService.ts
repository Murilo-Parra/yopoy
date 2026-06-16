import { FiscalProductionFinalStateLedgerClosureInput } from './FiscalProductionFinalStateLedgerClosureTypes';

export class FiscalProductionFinalStateLedgerClosureEvaluationService {
  public static evaluate(input: FiscalProductionFinalStateLedgerClosureInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID missing; administrative modeling continuing.');
    if (!input.requestId) warnings.push('Request ID missing; administrative modeling continuing.');
    return warnings;
  }
}
