import { FiscalProductionRetentionLifecycleDriftInput } from './FiscalProductionRetentionLifecycleDriftTypes';

export class FiscalProductionRetentionLifecycleDriftEvaluationService {
  public static evaluate(input: FiscalProductionRetentionLifecycleDriftInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID missing; administrative modeling continuing.');
    if (!input.requestId) warnings.push('Request ID missing; administrative modeling continuing.');
    return warnings;
  }
}
