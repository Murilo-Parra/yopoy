import { FiscalRealAuthorizationRequestInput, FiscalRealAuthorizationResult, FiscalRealAuthorizationStatus } from './FiscalRealAuthorizationRequestTypes';
import { FiscalRealAuthorizationPolicy } from './FiscalRealAuthorizationPolicy';
import { FiscalRealAuthorizationRequestSanitizer } from './FiscalRealAuthorizationRequestSanitizer';
import { FiscalRealAuthorizationRequestValidator } from './FiscalRealAuthorizationRequestValidator';

export class FiscalRealAuthorizationEvaluationService {
  public static evaluate(rawInput: FiscalRealAuthorizationRequestInput): FiscalRealAuthorizationResult {
    const input = FiscalRealAuthorizationRequestSanitizer.sanitize(rawInput);
    
    const policyResult = FiscalRealAuthorizationPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealAuthorizationResult;
    }

    const result = FiscalRealAuthorizationPolicy.getBaseResult();
    const validation = FiscalRealAuthorizationRequestValidator.validate(input);

    return {
      ...result,
      status: FiscalRealAuthorizationStatus.NON_EXECUTABLE_APPROVAL_ENVELOPE_READY,
      intakeAccepted: true,
      requestValidated: true,
      evaluationExecuted: true,
      nonExecutableEnvelopeGenerated: true,
      decisionSimulated: true,
      go: false,
      noGo: true,
      warnings: validation.warnings
    };
  }
}
