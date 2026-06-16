import { FiscalProductionRuntimeStepDryRunInput, FiscalProductionRuntimeStepDryRunResult } from './FiscalProductionRuntimeStepDryRunTypes';
import { FiscalProductionRuntimeStepDryRunPolicy } from './FiscalProductionRuntimeStepDryRunPolicy';
import { FiscalProductionRuntimeStepManifest } from './FiscalProductionRuntimeStepManifest';
import { FiscalProductionRuntimeCommandManifest } from './FiscalProductionRuntimeCommandManifest';
import { FiscalProductionRuntimeCommandSanitizer } from './FiscalProductionRuntimeCommandSanitizer';
import { FiscalProductionRuntimeStepSequencePlan } from './FiscalProductionRuntimeStepSequencePlan';
import { FiscalProductionRuntimeQueueNoOpPlan } from './FiscalProductionRuntimeQueueNoOpPlan';
import { FiscalProductionRuntimeWorkerNoOpContract } from './FiscalProductionRuntimeWorkerNoOpContract';
import { FiscalProductionRuntimeStepRollbackPlan } from './FiscalProductionRuntimeStepRollbackPlan';
import { FiscalProductionRuntimeCircuitBreakerPlan } from './FiscalProductionRuntimeCircuitBreakerPlan';
import { FiscalProductionRuntimeExecutionDependencyMatrix } from './FiscalProductionRuntimeExecutionDependencyMatrix';
import { FiscalProductionRuntimeStepDryRunBlockerRegister } from './FiscalProductionRuntimeStepDryRunBlockerRegister';
import { FiscalProductionRuntimeStepDryRunRiskRegister } from './FiscalProductionRuntimeStepDryRunRiskRegister';

export class FiscalProductionRuntimeStepDryRunEvaluationService {
  public static evaluate(input: FiscalProductionRuntimeStepDryRunInput): FiscalProductionRuntimeStepDryRunResult {
    const policyResult = FiscalProductionRuntimeStepDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRuntimeStepDryRunResult;
    }

    FiscalProductionRuntimeStepManifest.generateManifest();
    FiscalProductionRuntimeCommandManifest.generateManifest();
    FiscalProductionRuntimeCommandSanitizer.sanitize(input.metadata);
    FiscalProductionRuntimeStepSequencePlan.generatePlan();
    FiscalProductionRuntimeQueueNoOpPlan.generatePlan();
    FiscalProductionRuntimeWorkerNoOpContract.generateContract();
    FiscalProductionRuntimeStepRollbackPlan.generatePlan();
    FiscalProductionRuntimeCircuitBreakerPlan.generatePlan();
    FiscalProductionRuntimeExecutionDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRuntimeStepDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRuntimeStepDryRunBlockerRegister.getBlockers(),
      warnings: FiscalProductionRuntimeStepDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
