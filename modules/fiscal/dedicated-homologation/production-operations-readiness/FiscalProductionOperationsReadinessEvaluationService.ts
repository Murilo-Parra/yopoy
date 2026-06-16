import { FiscalProductionOperationsReadinessInput, FiscalProductionOperationsReadinessResult } from './FiscalProductionOperationsReadinessTypes';
import { FiscalProductionOperationsReadinessPolicy } from './FiscalProductionOperationsReadinessPolicy';
import { FiscalProductionOperationsTransitionReadinessBlueprint } from './FiscalProductionOperationsTransitionReadinessBlueprint';
import { FiscalProductionOperationsHardNoExecutionContract } from './FiscalProductionOperationsHardNoExecutionContract';
import { FiscalProductionOperationsResponsibilityInventory } from './FiscalProductionOperationsResponsibilityInventory';
import { FiscalProductionOperationsLegacyContinuityPlan } from './FiscalProductionOperationsLegacyContinuityPlan';
import { FiscalProductionOperationsTransitionNoActivationPlan } from './FiscalProductionOperationsTransitionNoActivationPlan';
import { FiscalProductionOperationsPreconditionMatrix } from './FiscalProductionOperationsPreconditionMatrix';
import { FiscalProductionOperationsDataBoundaryLockedPlan } from './FiscalProductionOperationsDataBoundaryLockedPlan';
import { FiscalProductionOperationsRuntimeLockedPlan } from './FiscalProductionOperationsRuntimeLockedPlan';
import { FiscalProductionOperationsExternalIntegrationLockedPlan } from './FiscalProductionOperationsExternalIntegrationLockedPlan';
import { FiscalProductionOperationsReadinessDependencyMatrix } from './FiscalProductionOperationsReadinessDependencyMatrix';
import { FiscalProductionOperationsReadinessBlockerRegister } from './FiscalProductionOperationsReadinessBlockerRegister';
import { FiscalProductionOperationsReadinessRiskRegister } from './FiscalProductionOperationsReadinessRiskRegister';

export class FiscalProductionOperationsReadinessEvaluationService {
  public static evaluate(input: FiscalProductionOperationsReadinessInput): FiscalProductionOperationsReadinessResult {
    const policyResult = FiscalProductionOperationsReadinessPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsReadinessResult;
    }

    FiscalProductionOperationsTransitionReadinessBlueprint.getBlueprint();
    FiscalProductionOperationsHardNoExecutionContract.getContract();
    FiscalProductionOperationsResponsibilityInventory.getInventory();
    FiscalProductionOperationsLegacyContinuityPlan.getPlan();
    FiscalProductionOperationsTransitionNoActivationPlan.getPlan();
    FiscalProductionOperationsPreconditionMatrix.getMatrix();
    FiscalProductionOperationsDataBoundaryLockedPlan.getPlan();
    FiscalProductionOperationsRuntimeLockedPlan.getPlan();
    FiscalProductionOperationsExternalIntegrationLockedPlan.getPlan();
    FiscalProductionOperationsReadinessDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionOperationsReadinessPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsReadinessBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsReadinessRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
