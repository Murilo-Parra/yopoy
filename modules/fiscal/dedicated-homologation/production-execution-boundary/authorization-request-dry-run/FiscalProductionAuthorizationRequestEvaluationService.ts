import { FiscalProductionAuthorizationRequestInput, FiscalProductionAuthorizationRequestResult } from './FiscalProductionAuthorizationRequestTypes';
import { FiscalProductionAuthorizationRequestPolicy } from './FiscalProductionAuthorizationRequestPolicy';
import { FiscalProductionAuthorizationRequestIntake } from './FiscalProductionAuthorizationRequestIntake';
import { FiscalProductionAuthorizationRequestSanitizer } from './FiscalProductionAuthorizationRequestSanitizer';
import { FiscalProductionStakeholderSubmissionEnvelope } from './FiscalProductionStakeholderSubmissionEnvelope';
import { FiscalProductionStakeholderResponsibilityMatrix } from './FiscalProductionStakeholderResponsibilityMatrix';
import { FiscalProductionStakeholderEligibilityChecklist } from './FiscalProductionStakeholderEligibilityChecklist';
import { FiscalProductionSubmissionNoNotificationEvidence } from './FiscalProductionSubmissionNoNotificationEvidence';
import { FiscalProductionAuthorizationRequestDependencyMatrix } from './FiscalProductionAuthorizationRequestDependencyMatrix';
import { FiscalProductionAuthorizationRequestBlockerRegister } from './FiscalProductionAuthorizationRequestBlockerRegister';
import { FiscalProductionAuthorizationRequestRiskRegister } from './FiscalProductionAuthorizationRequestRiskRegister';

export class FiscalProductionAuthorizationRequestEvaluationService {
  public static evaluate(input: FiscalProductionAuthorizationRequestInput): FiscalProductionAuthorizationRequestResult {
    const policyResult = FiscalProductionAuthorizationRequestPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionAuthorizationRequestResult;
    }

    FiscalProductionAuthorizationRequestIntake.generateIntake();
    FiscalProductionAuthorizationRequestSanitizer.sanitize(input);
    FiscalProductionStakeholderSubmissionEnvelope.generateEnvelope();
    FiscalProductionStakeholderResponsibilityMatrix.generateMatrix();
    FiscalProductionStakeholderEligibilityChecklist.generateChecklist();
    FiscalProductionSubmissionNoNotificationEvidence.generateEvidence();
    FiscalProductionAuthorizationRequestDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionAuthorizationRequestPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionAuthorizationRequestBlockerRegister.getBlockers(),
      warnings: FiscalProductionAuthorizationRequestRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
