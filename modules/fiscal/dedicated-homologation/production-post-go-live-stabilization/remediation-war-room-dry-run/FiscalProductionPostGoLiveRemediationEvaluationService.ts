import { FiscalProductionPostGoLiveRemediationInput } from './FiscalProductionPostGoLiveRemediationTypes';

export class FiscalProductionPostGoLiveRemediationEvaluationService {
  public static evaluate(input: FiscalProductionPostGoLiveRemediationInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative simulation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative simulation will proceed.');
    return warnings;
  }
}
