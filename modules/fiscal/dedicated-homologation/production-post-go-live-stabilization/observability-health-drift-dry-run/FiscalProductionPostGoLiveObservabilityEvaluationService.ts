import { FiscalProductionPostGoLiveObservabilityInput } from './FiscalProductionPostGoLiveObservabilityTypes';

export class FiscalProductionPostGoLiveObservabilityEvaluationService {
  public static evaluate(input: FiscalProductionPostGoLiveObservabilityInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative simulation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative simulation will proceed.');
    return warnings;
  }
}
