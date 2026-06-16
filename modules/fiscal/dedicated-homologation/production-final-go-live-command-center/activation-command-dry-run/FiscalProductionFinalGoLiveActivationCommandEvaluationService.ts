import { FiscalProductionFinalGoLiveActivationCommandInput } from './FiscalProductionFinalGoLiveActivationCommandTypes';

export class FiscalProductionFinalGoLiveActivationCommandEvaluationService {
  public static evaluate(input: FiscalProductionFinalGoLiveActivationCommandInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative modeling will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative modeling will proceed.');
    return warnings;
  }
}
