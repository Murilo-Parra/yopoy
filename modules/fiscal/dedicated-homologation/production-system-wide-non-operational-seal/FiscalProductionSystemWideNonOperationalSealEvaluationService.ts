import { FiscalProductionSystemWideNonOperationalSealInput } from './FiscalProductionSystemWideNonOperationalSealTypes';

export class FiscalProductionSystemWideNonOperationalSealEvaluationService {
  public static evaluate(input: FiscalProductionSystemWideNonOperationalSealInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID missing; administrative modeling continuing.');
    if (!input.requestId) warnings.push('Request ID missing; administrative modeling continuing.');
    return warnings;
  }
}
