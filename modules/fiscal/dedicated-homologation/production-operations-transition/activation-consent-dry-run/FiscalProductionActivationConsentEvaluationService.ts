import { FiscalProductionActivationConsentInput, FiscalProductionActivationConsentResult } from './FiscalProductionActivationConsentTypes';
import { FiscalProductionActivationConsentPolicy } from './FiscalProductionActivationConsentPolicy';
import { FiscalProductionActivationConsentRequestIntake } from './FiscalProductionActivationConsentRequestIntake';
import { FiscalProductionActivationConsentRequestSanitizer } from './FiscalProductionActivationConsentRequestSanitizer';
import { FiscalProductionExplicitActivationConsentEnvelope } from './FiscalProductionExplicitActivationConsentEnvelope';
import { FiscalProductionConsentSignerEligibilityMatrix } from './FiscalProductionConsentSignerEligibilityMatrix';
import { FiscalProductionTwoPersonConsentSimulation } from './FiscalProductionTwoPersonConsentSimulation';
import { FiscalProductionConsentSeparationOfDutiesReview } from './FiscalProductionConsentSeparationOfDutiesReview';
import { FiscalProductionAuthorizationScopeNoOpPlan } from './FiscalProductionAuthorizationScopeNoOpPlan';
import { FiscalProductionConsentNoNotificationEvidence } from './FiscalProductionConsentNoNotificationEvidence';
import { FiscalProductionActivationConsentDependencyMatrix } from './FiscalProductionActivationConsentDependencyMatrix';
import { FiscalProductionActivationConsentBlockerRegister } from './FiscalProductionActivationConsentBlockerRegister';
import { FiscalProductionActivationConsentRiskRegister } from './FiscalProductionActivationConsentRiskRegister';

export class FiscalProductionActivationConsentEvaluationService {
  public static evaluate(input: FiscalProductionActivationConsentInput): FiscalProductionActivationConsentResult {
    const policyResult = FiscalProductionActivationConsentPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionActivationConsentResult;
    }

    FiscalProductionActivationConsentRequestIntake.getIntake();
    FiscalProductionActivationConsentRequestSanitizer.getSanitizer();
    FiscalProductionExplicitActivationConsentEnvelope.getEnvelope();
    FiscalProductionConsentSignerEligibilityMatrix.getMatrix();
    FiscalProductionTwoPersonConsentSimulation.getSimulation();
    FiscalProductionConsentSeparationOfDutiesReview.getReview();
    FiscalProductionAuthorizationScopeNoOpPlan.getPlan();
    FiscalProductionConsentNoNotificationEvidence.getEvidence();
    FiscalProductionActivationConsentDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionActivationConsentPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionActivationConsentBlockerRegister.getBlockers(),
      warnings: FiscalProductionActivationConsentRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
