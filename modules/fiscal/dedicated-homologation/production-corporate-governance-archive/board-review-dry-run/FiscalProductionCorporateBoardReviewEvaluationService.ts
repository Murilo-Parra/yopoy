import { FiscalProductionCorporateBoardReviewInput } from './FiscalProductionCorporateBoardReviewTypes';

export class FiscalProductionCorporateBoardReviewEvaluationService {
  public static evaluate(input: FiscalProductionCorporateBoardReviewInput): string[] {
    const warnings: string[] = [];
    if (!input.companyId) warnings.push('Company ID missing; administrative modeling continuing.');
    if (!input.requestId) warnings.push('Request ID missing; administrative modeling continuing.');
    return warnings;
  }
}
