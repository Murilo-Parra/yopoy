import { FiscalProductionComplianceRollbackShutdownInput } from './FiscalProductionComplianceRollbackShutdownTypes';

export class FiscalProductionComplianceRollbackShutdownEvaluationService {
  public static evaluate(input: FiscalProductionComplianceRollbackShutdownInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but simulated evaluation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but simulated evaluation will proceed.');
    return warnings;
  }
}
