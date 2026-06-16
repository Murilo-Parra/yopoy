import { FiscalProductionTrafficRoutingInput } from './FiscalProductionTrafficRoutingTypes';

export class FiscalProductionTrafficRoutingEvaluationService {
  public static evaluate(input: FiscalProductionTrafficRoutingInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative evaluation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative evaluation will proceed.');
    return warnings;
  }
}
