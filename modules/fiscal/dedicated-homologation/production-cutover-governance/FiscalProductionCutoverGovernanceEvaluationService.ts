import { FiscalProductionCutoverGovernanceInput, FiscalProductionCutoverGovernanceResult } from './FiscalProductionCutoverGovernanceTypes';
import { FiscalProductionCutoverGovernancePolicy } from './FiscalProductionCutoverGovernancePolicy';
import { FiscalProductionCutoverGovernanceBlueprint } from './FiscalProductionCutoverGovernanceBlueprint';
import { FiscalProductionReversibleGoLiveNoOpContract } from './FiscalProductionReversibleGoLiveNoOpContract';
import { FiscalProductionCutoverWindowPlan } from './FiscalProductionCutoverWindowPlan';
import { FiscalProductionLegacyPreservationPlan } from './FiscalProductionLegacyPreservationPlan';
import { FiscalProductionTrafficSwitchNoOpPlan } from './FiscalProductionTrafficSwitchNoOpPlan';
import { FiscalProductionReversionPathPlan } from './FiscalProductionReversionPathPlan';
import { FiscalProductionCutoverAbortCriteria } from './FiscalProductionCutoverAbortCriteria';
import { FiscalProductionCutoverReadinessMatrix } from './FiscalProductionCutoverReadinessMatrix';
import { FiscalProductionCutoverDependencyMatrix } from './FiscalProductionCutoverDependencyMatrix';
import { FiscalProductionCutoverGovernanceBlockerRegister } from './FiscalProductionCutoverGovernanceBlockerRegister';
import { FiscalProductionCutoverGovernanceRiskRegister } from './FiscalProductionCutoverGovernanceRiskRegister';

export class FiscalProductionCutoverGovernanceEvaluationService {
  public static evaluate(input: FiscalProductionCutoverGovernanceInput): FiscalProductionCutoverGovernanceResult {
    const policyResult = FiscalProductionCutoverGovernancePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCutoverGovernanceResult;
    }

    FiscalProductionCutoverGovernanceBlueprint.generateBlueprint();
    FiscalProductionReversibleGoLiveNoOpContract.getContract();
    FiscalProductionCutoverWindowPlan.getPlan();
    FiscalProductionLegacyPreservationPlan.getPlan();
    FiscalProductionTrafficSwitchNoOpPlan.getPlan();
    FiscalProductionReversionPathPlan.getPlan();
    FiscalProductionCutoverAbortCriteria.getCriteria();
    FiscalProductionCutoverReadinessMatrix.getMatrix();
    FiscalProductionCutoverDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionCutoverGovernancePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCutoverGovernanceBlockerRegister.getBlockers(),
      warnings: FiscalProductionCutoverGovernanceRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
