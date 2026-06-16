import { FiscalProductionRuntimeQueueUnlockInput, FiscalProductionRuntimeQueueUnlockResult } from './FiscalProductionRuntimeQueueUnlockTypes';
import { FiscalProductionRuntimeQueueUnlockPolicy } from './FiscalProductionRuntimeQueueUnlockPolicy';
import { FiscalProductionRuntimeQueueUnlockSimulation } from './FiscalProductionRuntimeQueueUnlockSimulation';
import { FiscalProductionRuntimeQueueStateSimulation } from './FiscalProductionRuntimeQueueStateSimulation';
import { FiscalProductionRuntimeDispatchEligibilityMatrix } from './FiscalProductionRuntimeDispatchEligibilityMatrix';
import { FiscalProductionRuntimeWorkerDispatchNoOpPlan } from './FiscalProductionRuntimeWorkerDispatchNoOpPlan';
import { FiscalProductionRuntimeCommandDispatchBoundary } from './FiscalProductionRuntimeCommandDispatchBoundary';
import { FiscalProductionRuntimeDispatchSafetyChecklist } from './FiscalProductionRuntimeDispatchSafetyChecklist';
import { FiscalProductionRuntimeNoJobEnqueueEvidence } from './FiscalProductionRuntimeNoJobEnqueueEvidence';
import { FiscalProductionRuntimeQueueUnlockDependencyMatrix } from './FiscalProductionRuntimeQueueUnlockDependencyMatrix';
import { FiscalProductionRuntimeQueueUnlockBlockerRegister } from './FiscalProductionRuntimeQueueUnlockBlockerRegister';
import { FiscalProductionRuntimeQueueUnlockRiskRegister } from './FiscalProductionRuntimeQueueUnlockRiskRegister';

export class FiscalProductionRuntimeQueueUnlockEvaluationService {
  public static evaluate(input: FiscalProductionRuntimeQueueUnlockInput): FiscalProductionRuntimeQueueUnlockResult {
    const policyResult = FiscalProductionRuntimeQueueUnlockPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRuntimeQueueUnlockResult;
    }

    FiscalProductionRuntimeQueueUnlockSimulation.generateSimulation();
    FiscalProductionRuntimeQueueStateSimulation.generateSimulation();
    FiscalProductionRuntimeDispatchEligibilityMatrix.getMatrix();
    FiscalProductionRuntimeWorkerDispatchNoOpPlan.generatePlan();
    FiscalProductionRuntimeCommandDispatchBoundary.generateBoundary();
    FiscalProductionRuntimeDispatchSafetyChecklist.generateChecklist();
    FiscalProductionRuntimeNoJobEnqueueEvidence.generateEvidence();
    FiscalProductionRuntimeQueueUnlockDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRuntimeQueueUnlockPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRuntimeQueueUnlockBlockerRegister.getBlockers(),
      warnings: FiscalProductionRuntimeQueueUnlockRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
