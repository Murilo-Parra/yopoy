import { FiscalProductionRetentionAccessDisclosureInput } from './FiscalProductionRetentionAccessDisclosureTypes';

export class FiscalProductionRetentionAccessDisclosureEvaluationService {
  public static evaluate(input: FiscalProductionRetentionAccessDisclosureInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID missing; administrative modeling continuing.');
    if (!input.requestId) warnings.push('Request ID missing; administrative modeling continuing.');
    return warnings;
  }
}
