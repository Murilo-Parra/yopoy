import { FiscalProductionPostGoLiveStabilizationClosureInput } from './FiscalProductionPostGoLiveStabilizationClosureTypes';

export class FiscalProductionPostGoLiveStabilizationClosureEvaluationService {
  public static evaluate(input: FiscalProductionPostGoLiveStabilizationClosureInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative closure will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative closure will proceed.');
    return warnings;
  }
}
