import { FiscalRealExecutionGateInput, FiscalRealExecutionGateResult } from './FiscalRealExecutionGateTypes';
import { FiscalRealExecutionGatePolicy } from './FiscalRealExecutionGatePolicy';

export class FiscalRealExecutionGateEvaluationService {
  public static evaluate(input: FiscalRealExecutionGateInput): FiscalRealExecutionGateResult {
    const policyResult = FiscalRealExecutionGatePolicy.enforce(input);
    if (policyResult) {
       return policyResult as FiscalRealExecutionGateResult;
    }

    const result = FiscalRealExecutionGatePolicy.getBaseResult();
    result.evaluationExecuted = true;
    result.success = true;
    result.go = false;
    result.noGo = true;

    return result;
  }
}
