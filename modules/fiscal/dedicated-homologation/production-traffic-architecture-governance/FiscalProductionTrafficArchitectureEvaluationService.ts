import { FiscalProductionTrafficArchitectureInput } from './FiscalProductionTrafficArchitectureTypes';

export class FiscalProductionTrafficArchitectureEvaluationService {
  public static evaluate(input: FiscalProductionTrafficArchitectureInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but administrative modeling will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but administrative modeling will proceed.');
    return warnings;
  }
}
