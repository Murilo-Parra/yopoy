import { FiscalProductionRollbackAbortInput, FiscalProductionRollbackAbortResult } from './FiscalProductionRollbackAbortTypes';
import { FiscalProductionRollbackAbortPolicy } from './FiscalProductionRollbackAbortPolicy';
import { FiscalProductionRollbackMatrixSimulation } from './FiscalProductionRollbackMatrixSimulation';
import { FiscalProductionCutoverAbortNoOpPlan } from './FiscalProductionCutoverAbortNoOpPlan';
import { FiscalProductionRollbackScenarioCatalog } from './FiscalProductionRollbackScenarioCatalog';
import { FiscalProductionLegacyContinuityDuringAbortPlan } from './FiscalProductionLegacyContinuityDuringAbortPlan';
import { FiscalProductionNoRealRollbackEvidence } from './FiscalProductionNoRealRollbackEvidence';
import { FiscalProductionTrafficRecoveryNoOpMatrix } from './FiscalProductionTrafficRecoveryNoOpMatrix';
import { FiscalProductionRollbackSafetyChecklist } from './FiscalProductionRollbackSafetyChecklist';
import { FiscalProductionRollbackAbortDependencyMatrix } from './FiscalProductionRollbackAbortDependencyMatrix';
import { FiscalProductionRollbackAbortBlockerRegister } from './FiscalProductionRollbackAbortBlockerRegister';
import { FiscalProductionRollbackAbortRiskRegister } from './FiscalProductionRollbackAbortRiskRegister';

export class FiscalProductionRollbackAbortEvaluationService {
  public static evaluate(input: FiscalProductionRollbackAbortInput): FiscalProductionRollbackAbortResult {
    const policyResult = FiscalProductionRollbackAbortPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRollbackAbortResult;
    }

    FiscalProductionRollbackMatrixSimulation.getSimulation();
    FiscalProductionCutoverAbortNoOpPlan.getPlan();
    FiscalProductionRollbackScenarioCatalog.getCatalog();
    FiscalProductionLegacyContinuityDuringAbortPlan.getPlan();
    FiscalProductionNoRealRollbackEvidence.getEvidence();
    FiscalProductionTrafficRecoveryNoOpMatrix.getMatrix();
    FiscalProductionRollbackSafetyChecklist.getChecklist();
    FiscalProductionRollbackAbortDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRollbackAbortPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRollbackAbortBlockerRegister.getBlockers(),
      warnings: FiscalProductionRollbackAbortRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
