import { FiscalRealExecutionPreparationInput, FiscalRealExecutionPreparationResult } from './FiscalRealExecutionPreparationTypes';
import { FiscalRealExecutionPreparationPolicy } from './FiscalRealExecutionPreparationPolicy';
import { FiscalRealOperationalEnvelope } from './FiscalRealOperationalEnvelope';
import { FiscalRealExecutionPreparationChecklist } from './FiscalRealExecutionPreparationChecklist';
import { FiscalRealExecutionPreparationBlockerRegister } from './FiscalRealExecutionPreparationBlockerRegister';
import { FiscalRealExecutionPreparationRiskRegister } from './FiscalRealExecutionPreparationRiskRegister';

export class FiscalRealExecutionPreparationEvaluationService {
  public static evaluate(input: FiscalRealExecutionPreparationInput): FiscalRealExecutionPreparationResult {
    const policyResult = FiscalRealExecutionPreparationPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealExecutionPreparationResult;
    }

    const result = FiscalRealExecutionPreparationPolicy.getBaseResult();
    
    return {
      ...result,
      evaluationExecuted: true,
      preparationSimulated: true,
      operationalEnvelopeGenerated: true,
      go: false,
      noGo: true
    };
  }
}
