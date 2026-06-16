import { FiscalProductionAuthorizationDeliberationInput, FiscalProductionAuthorizationDeliberationResult } from './FiscalProductionAuthorizationDeliberationTypes';
import { FiscalProductionAuthorizationDeliberationEvaluationService } from './FiscalProductionAuthorizationDeliberationEvaluationService';

export class FiscalProductionAuthorizationDeliberationDecisionService {
  public static simulateDecision(input: FiscalProductionAuthorizationDeliberationInput): FiscalProductionAuthorizationDeliberationResult {
    return FiscalProductionAuthorizationDeliberationEvaluationService.evaluate(input);
  }
}
