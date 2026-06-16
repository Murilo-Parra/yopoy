import { FiscalProductionActivationConsentInput, FiscalProductionActivationConsentResult } from './FiscalProductionActivationConsentTypes';
import { FiscalProductionActivationConsentEvaluationService } from './FiscalProductionActivationConsentEvaluationService';

export class FiscalProductionActivationConsentDecisionService {
  public static simulateDecision(input: FiscalProductionActivationConsentInput): FiscalProductionActivationConsentResult {
    return FiscalProductionActivationConsentEvaluationService.evaluate(input);
  }
}
