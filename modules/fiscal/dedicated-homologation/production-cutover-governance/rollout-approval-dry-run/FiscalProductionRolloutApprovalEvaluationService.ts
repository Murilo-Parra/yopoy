import { FiscalProductionRolloutApprovalInput, FiscalProductionRolloutApprovalResult } from './FiscalProductionRolloutApprovalTypes';
import { FiscalProductionRolloutApprovalPolicy } from './FiscalProductionRolloutApprovalPolicy';
import { FiscalProductionRolloutApprovalMatrix } from './FiscalProductionRolloutApprovalMatrix';
import { FiscalProductionFinalReleaseVerificationPlan } from './FiscalProductionFinalReleaseVerificationPlan';
import { FiscalProductionReleaseReadinessNoOpReview } from './FiscalProductionReleaseReadinessNoOpReview';
import { FiscalProductionCanaryRolloutNoOpPlan } from './FiscalProductionCanaryRolloutNoOpPlan';
import { FiscalProductionRolloutPercentageNoOpMatrix } from './FiscalProductionRolloutPercentageNoOpMatrix';
import { FiscalProductionGoLiveVerificationNoOpEvidence } from './FiscalProductionGoLiveVerificationNoOpEvidence';
import { FiscalProductionNoTrafficPromotionEvidence } from './FiscalProductionNoTrafficPromotionEvidence';
import { FiscalProductionRolloutApprovalDependencyMatrix } from './FiscalProductionRolloutApprovalDependencyMatrix';
import { FiscalProductionRolloutApprovalBlockerRegister } from './FiscalProductionRolloutApprovalBlockerRegister';
import { FiscalProductionRolloutApprovalRiskRegister } from './FiscalProductionRolloutApprovalRiskRegister';

export class FiscalProductionRolloutApprovalEvaluationService {
  public static evaluate(input: FiscalProductionRolloutApprovalInput): FiscalProductionRolloutApprovalResult {
    const policyResult = FiscalProductionRolloutApprovalPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRolloutApprovalResult;
    }

    FiscalProductionRolloutApprovalMatrix.getMatrix();
    FiscalProductionFinalReleaseVerificationPlan.getPlan();
    FiscalProductionReleaseReadinessNoOpReview.getReview();
    FiscalProductionCanaryRolloutNoOpPlan.getPlan();
    FiscalProductionRolloutPercentageNoOpMatrix.getMatrix();
    FiscalProductionGoLiveVerificationNoOpEvidence.getEvidence();
    FiscalProductionNoTrafficPromotionEvidence.getEvidence();
    FiscalProductionRolloutApprovalDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRolloutApprovalPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRolloutApprovalBlockerRegister.getBlockers(),
      warnings: FiscalProductionRolloutApprovalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
