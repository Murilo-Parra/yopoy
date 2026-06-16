import { FiscalProductionBaselineCutoverInput, FiscalProductionBaselineCutoverResult } from './FiscalProductionBaselineCutoverTypes';
import { FiscalProductionBaselineCutoverPolicy } from './FiscalProductionBaselineCutoverPolicy';
import { FiscalProductionBaselineCutoverReadinessBlueprint } from './FiscalProductionBaselineCutoverReadinessBlueprint';
import { FiscalProductionHardExecutionLockContract } from './FiscalProductionHardExecutionLockContract';
import { FiscalProductionBaselineCutoverScopeInventory } from './FiscalProductionBaselineCutoverScopeInventory';
import { FiscalProductionBaselineCutoverPreconditionMatrix } from './FiscalProductionBaselineCutoverPreconditionMatrix';
import { FiscalProductionLegacyContinuityBaselinePlan } from './FiscalProductionLegacyContinuityBaselinePlan';
import { FiscalProductionV2ActivationLockedPlan } from './FiscalProductionV2ActivationLockedPlan';
import { FiscalProductionTrafficMutationLockedPlan } from './FiscalProductionTrafficMutationLockedPlan';
import { FiscalProductionRuntimeExecutionLockedPlan } from './FiscalProductionRuntimeExecutionLockedPlan';
import { FiscalProductionDataBoundaryLockedPlan } from './FiscalProductionDataBoundaryLockedPlan';
import { FiscalProductionExternalIntegrationLockedPlan } from './FiscalProductionExternalIntegrationLockedPlan';
import { FiscalProductionBaselineCutoverDependencyMatrix } from './FiscalProductionBaselineCutoverDependencyMatrix';
import { FiscalProductionBaselineCutoverBlockerRegister } from './FiscalProductionBaselineCutoverBlockerRegister';
import { FiscalProductionBaselineCutoverRiskRegister } from './FiscalProductionBaselineCutoverRiskRegister';

export class FiscalProductionBaselineCutoverEvaluationService {
  public static evaluate(input: FiscalProductionBaselineCutoverInput): FiscalProductionBaselineCutoverResult {
    const policyResult = FiscalProductionBaselineCutoverPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionBaselineCutoverResult;
    }

    FiscalProductionBaselineCutoverReadinessBlueprint.getBlueprint();
    FiscalProductionHardExecutionLockContract.getContract();
    FiscalProductionBaselineCutoverScopeInventory.getInventory();
    FiscalProductionBaselineCutoverPreconditionMatrix.getMatrix();
    FiscalProductionLegacyContinuityBaselinePlan.getPlan();
    FiscalProductionV2ActivationLockedPlan.getPlan();
    FiscalProductionTrafficMutationLockedPlan.getPlan();
    FiscalProductionRuntimeExecutionLockedPlan.getPlan();
    FiscalProductionDataBoundaryLockedPlan.getPlan();
    FiscalProductionExternalIntegrationLockedPlan.getPlan();
    FiscalProductionBaselineCutoverDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionBaselineCutoverPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionBaselineCutoverBlockerRegister.getBlockers(),
      warnings: FiscalProductionBaselineCutoverRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
