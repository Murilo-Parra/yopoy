import { FiscalProductionLoadBalancerDnsInput } from './FiscalProductionLoadBalancerDnsTypes';

export class FiscalProductionLoadBalancerDnsEvaluationService {
  public static evaluate(input: FiscalProductionLoadBalancerDnsInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID is missing but mapping evaluation will proceed.');
    if (!input.requestId) warnings.push('Request ID is missing but mapping evaluation will proceed.');
    return warnings;
  }
}
