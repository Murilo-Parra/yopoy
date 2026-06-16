import { FiscalProductionTrafficSwitchInput, FiscalProductionTrafficSwitchResult } from './FiscalProductionTrafficSwitchTypes';
import { FiscalProductionTrafficSwitchPolicy } from './FiscalProductionTrafficSwitchPolicy';
import { FiscalProductionTrafficSwitchReadinessSimulation } from './FiscalProductionTrafficSwitchReadinessSimulation';
import { FiscalProductionRouteActivationGateNoOpPlan } from './FiscalProductionRouteActivationGateNoOpPlan';
import { FiscalProductionLegacyContinuityNoOpPlan } from './FiscalProductionLegacyContinuityNoOpPlan';
import { FiscalProductionV2RouteActivationNoOpPlan } from './FiscalProductionV2RouteActivationNoOpPlan';
import { FiscalProductionTrafficPercentageRampSimulation } from './FiscalProductionTrafficPercentageRampSimulation';
import { FiscalProductionCanaryTrafficPromotionNoOpMatrix } from './FiscalProductionCanaryTrafficPromotionNoOpMatrix';
import { FiscalProductionReversibleGoLiveNoOpPlan } from './FiscalProductionReversibleGoLiveNoOpPlan';
import { FiscalProductionTrafficAbortReversionMatrix } from './FiscalProductionTrafficAbortReversionMatrix';
import { FiscalProductionNoTrafficMutationEvidence } from './FiscalProductionNoTrafficMutationEvidence';
import { FiscalProductionTrafficSwitchDependencyMatrix } from './FiscalProductionTrafficSwitchDependencyMatrix';
import { FiscalProductionTrafficSwitchBlockerRegister } from './FiscalProductionTrafficSwitchBlockerRegister';
import { FiscalProductionTrafficSwitchRiskRegister } from './FiscalProductionTrafficSwitchRiskRegister';

export class FiscalProductionTrafficSwitchEvaluationService {
  public static evaluate(input: FiscalProductionTrafficSwitchInput): FiscalProductionTrafficSwitchResult {
    const policyResult = FiscalProductionTrafficSwitchPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionTrafficSwitchResult;
    }

    FiscalProductionTrafficSwitchReadinessSimulation.getSimulation();
    FiscalProductionRouteActivationGateNoOpPlan.getPlan();
    FiscalProductionLegacyContinuityNoOpPlan.getPlan();
    FiscalProductionV2RouteActivationNoOpPlan.getPlan();
    FiscalProductionTrafficPercentageRampSimulation.getSimulation();
    FiscalProductionCanaryTrafficPromotionNoOpMatrix.getMatrix();
    FiscalProductionReversibleGoLiveNoOpPlan.getPlan();
    FiscalProductionTrafficAbortReversionMatrix.getMatrix();
    FiscalProductionNoTrafficMutationEvidence.getEvidence();
    FiscalProductionTrafficSwitchDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionTrafficSwitchPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionTrafficSwitchBlockerRegister.getBlockers(),
      warnings: FiscalProductionTrafficSwitchRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
