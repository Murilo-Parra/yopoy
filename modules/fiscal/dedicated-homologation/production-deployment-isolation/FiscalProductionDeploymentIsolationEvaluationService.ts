import { FiscalProductionDeploymentIsolationInput, FiscalProductionDeploymentIsolationResult } from './FiscalProductionDeploymentIsolationTypes';
import { FiscalProductionDeploymentIsolationPolicy } from './FiscalProductionDeploymentIsolationPolicy';
import { FiscalProductionActivationBlueprint } from './FiscalProductionActivationBlueprint';
import { FiscalReleaseDeploymentIsolationContract } from './FiscalReleaseDeploymentIsolationContract';
import { FiscalReleaseArtifactInventory } from './FiscalReleaseArtifactInventory';
import { FiscalDeploymentBoundaryPlan } from './FiscalDeploymentBoundaryPlan';
import { FiscalProductionTrafficNonActivationPlan } from './FiscalProductionTrafficNonActivationPlan';
import { FiscalReleaseRolloutIsolationPlan } from './FiscalReleaseRolloutIsolationPlan';
import { FiscalDeploymentRollbackIsolationPlan } from './FiscalDeploymentRollbackIsolationPlan';
import { FiscalProductionDeploymentDependencyMatrix } from './FiscalProductionDeploymentDependencyMatrix';
import { FiscalProductionDeploymentIsolationBlockerRegister } from './FiscalProductionDeploymentIsolationBlockerRegister';
import { FiscalProductionDeploymentIsolationRiskRegister } from './FiscalProductionDeploymentIsolationRiskRegister';

export class FiscalProductionDeploymentIsolationEvaluationService {
  public static evaluate(input: FiscalProductionDeploymentIsolationInput): FiscalProductionDeploymentIsolationResult {
    const policyResult = FiscalProductionDeploymentIsolationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionDeploymentIsolationResult;
    }

    FiscalProductionActivationBlueprint.generateBlueprint();
    FiscalReleaseDeploymentIsolationContract.generateContract();
    FiscalReleaseArtifactInventory.generateInventory();
    FiscalDeploymentBoundaryPlan.generatePlan();
    FiscalProductionTrafficNonActivationPlan.generatePlan();
    FiscalReleaseRolloutIsolationPlan.generatePlan();
    FiscalDeploymentRollbackIsolationPlan.generatePlan();
    FiscalProductionDeploymentDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionDeploymentIsolationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionDeploymentIsolationBlockerRegister.getBlockers(),
      warnings: FiscalProductionDeploymentIsolationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
