import { FiscalProductionPostGoLiveStabilizationInput } from './FiscalProductionPostGoLiveStabilizationTypes';

export class FiscalProductionPostGoLiveStabilizationEvaluationService {
  public static evaluate(input: FiscalProductionPostGoLiveStabilizationInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative observation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative observation will proceed.');
    return warnings;
  }
}
