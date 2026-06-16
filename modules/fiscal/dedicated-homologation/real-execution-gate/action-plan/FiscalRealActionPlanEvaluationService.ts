import { FiscalRealAuthorizationPayloadInput, FiscalRealActionPlanResult } from './FiscalRealExecutionActionPlanTypes';
import { FiscalRealAuthorizationPayloadBuilder } from './FiscalRealAuthorizationPayloadBuilder';
import { FiscalRealAuthorizationPayloadValidator } from './FiscalRealAuthorizationPayloadValidator';
import { FiscalRealActionPlanPolicy } from './FiscalRealActionPlanPolicy';

export class FiscalRealActionPlanEvaluationService {
  public static evaluate(input: FiscalRealAuthorizationPayloadInput): FiscalRealActionPlanResult {
    const policyResult = FiscalRealActionPlanPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealActionPlanResult;
    }

    const validation = FiscalRealAuthorizationPayloadValidator.validate(input);
    const result = FiscalRealActionPlanPolicy.getBaseResult();

    if (!validation.valid) {
      return {
        ...result,
        success: false,
        status: 'BLOCKED_FOR_REAL_EXECUTION',
        blockers: [...result.blockers, ...validation.blockers],
        warnings: [...result.warnings, ...validation.warnings]
      };
    }

    return {
      ...result,
      warnings: validation.warnings
    };
  }
}
