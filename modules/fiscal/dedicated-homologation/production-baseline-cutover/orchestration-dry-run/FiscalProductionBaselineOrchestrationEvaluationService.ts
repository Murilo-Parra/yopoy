import { FiscalProductionBaselineOrchestrationInput, FiscalProductionBaselineOrchestrationResult } from './FiscalProductionBaselineOrchestrationTypes';
import { FiscalProductionBaselineOrchestrationPolicy } from './FiscalProductionBaselineOrchestrationPolicy';
import { FiscalProductionCutoverOrchestrationNoOpPlan } from './FiscalProductionCutoverOrchestrationNoOpPlan';
import { FiscalProductionEndpointRolloutNoOpPlan } from './FiscalProductionEndpointRolloutNoOpPlan';
import { FiscalProductionRoutePromotionNoOpPlan } from './FiscalProductionRoutePromotionNoOpPlan';
import { FiscalProductionTrafficSliceNoOpMatrix } from './FiscalProductionTrafficSliceNoOpMatrix';
import { FiscalProductionLegacyFallbackOrchestrationPlan } from './FiscalProductionLegacyFallbackOrchestrationPlan';
import { FiscalProductionRollbackOrchestrationNoOpPlan } from './FiscalProductionRollbackOrchestrationNoOpPlan';
import { FiscalProductionOperationalSequenceNoOpMatrix } from './FiscalProductionOperationalSequenceNoOpMatrix';
import { FiscalProductionEndpointReadinessNoCallEvidence } from './FiscalProductionEndpointReadinessNoCallEvidence';
import { FiscalProductionNoRuntimeExecutionEvidence } from './FiscalProductionNoRuntimeExecutionEvidence';
import { FiscalProductionBaselineOrchestrationDependencyMatrix } from './FiscalProductionBaselineOrchestrationDependencyMatrix';
import { FiscalProductionBaselineOrchestrationBlockerRegister } from './FiscalProductionBaselineOrchestrationBlockerRegister';
import { FiscalProductionBaselineOrchestrationRiskRegister } from './FiscalProductionBaselineOrchestrationRiskRegister';

export class FiscalProductionBaselineOrchestrationEvaluationService {
  public static evaluate(input: FiscalProductionBaselineOrchestrationInput): FiscalProductionBaselineOrchestrationResult {
    const policyResult = FiscalProductionBaselineOrchestrationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionBaselineOrchestrationResult;
    }

    FiscalProductionCutoverOrchestrationNoOpPlan.getPlan();
    FiscalProductionEndpointRolloutNoOpPlan.getPlan();
    FiscalProductionRoutePromotionNoOpPlan.getPlan();
    FiscalProductionTrafficSliceNoOpMatrix.getMatrix();
    FiscalProductionLegacyFallbackOrchestrationPlan.getPlan();
    FiscalProductionRollbackOrchestrationNoOpPlan.getPlan();
    FiscalProductionOperationalSequenceNoOpMatrix.getMatrix();
    FiscalProductionEndpointReadinessNoCallEvidence.getEvidence();
    FiscalProductionNoRuntimeExecutionEvidence.getEvidence();
    FiscalProductionBaselineOrchestrationDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionBaselineOrchestrationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionBaselineOrchestrationBlockerRegister.getBlockers(),
      warnings: FiscalProductionBaselineOrchestrationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
