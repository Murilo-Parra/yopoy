import { FiscalProductionFinalStateLedgerInput } from './FiscalProductionFinalStateLedgerTypes';

export class FiscalProductionFinalStateLedgerEvaluationService {
  public static evaluate(input: FiscalProductionFinalStateLedgerInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative modeling will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative modeling will proceed.');
    return warnings;
  }
}
