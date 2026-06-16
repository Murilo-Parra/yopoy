import { FiscalRealChangeWindowInput, FiscalRealChangeWindowResult } from './FiscalRealChangeWindowTypes';
import { FiscalRealChangeWindowPolicy } from './FiscalRealChangeWindowPolicy';

export class FiscalRealChangeWindowEvaluationService {
  public static evaluate(input: FiscalRealChangeWindowInput): FiscalRealChangeWindowResult {
    const policyResult = FiscalRealChangeWindowPolicy.enforce(input);
    if (policyResult) {
       return policyResult as FiscalRealChangeWindowResult;
    }

    const result = FiscalRealChangeWindowPolicy.getBaseResult();
    result.success = true;
    result.go = false;
    result.noGo = true;

    return result;
  }
}
