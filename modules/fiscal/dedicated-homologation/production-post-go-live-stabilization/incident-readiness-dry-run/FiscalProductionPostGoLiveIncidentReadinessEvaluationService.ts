import { FiscalProductionPostGoLiveIncidentReadinessInput } from './FiscalProductionPostGoLiveIncidentReadinessTypes';

export class FiscalProductionPostGoLiveIncidentReadinessEvaluationService {
  public static evaluate(input: FiscalProductionPostGoLiveIncidentReadinessInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative simulation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative simulation will proceed.');
    return warnings;
  }
}
