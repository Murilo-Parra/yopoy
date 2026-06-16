import { FiscalProductionAuthorizationRequestInput, FiscalProductionAuthorizationRequestResult, FiscalProductionAuthorizationRequestStatus } from './FiscalProductionAuthorizationRequestTypes';
import { FiscalProductionAuthorizationRequestEvaluationService } from './FiscalProductionAuthorizationRequestEvaluationService';

export class FiscalProductionAuthorizationRequestDecisionService {
  public static simulateDecision(input: FiscalProductionAuthorizationRequestInput): FiscalProductionAuthorizationRequestResult {
    const evaluation = FiscalProductionAuthorizationRequestEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionAuthorizationRequestStatus.NON_EXECUTABLE_SUBMISSION_ENVELOPE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
