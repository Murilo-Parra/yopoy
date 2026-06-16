import { FiscalProductionBaselineRollbackInput, FiscalProductionBaselineRollbackResult } from './FiscalProductionBaselineRollbackTypes';
import { FiscalProductionRollbackReversionPolicy } from './FiscalProductionRollbackReversionPolicy';
import { FiscalProductionBaselineRollbackSimulationMatrix } from './FiscalProductionBaselineRollbackSimulationMatrix';
import { FiscalProductionBaselineAbortNoOpPlan } from './FiscalProductionBaselineAbortNoOpPlan';
import { FiscalProductionLegacyReversionNoOpPlan } from './FiscalProductionLegacyReversionNoOpPlan';
import { FiscalProductionReversionPathSafetyMatrix } from './FiscalProductionReversionPathSafetyMatrix';
import { FiscalProductionPostAbortLegacyContinuityPlan } from './FiscalProductionPostAbortLegacyContinuityPlan';
import { FiscalProductionNoTrafficMutationDuringRollbackEvidence } from './FiscalProductionNoTrafficMutationDuringRollbackEvidence';
import { FiscalProductionNoRealRollbackExecutionEvidence } from './FiscalProductionNoRealRollbackExecutionEvidence';
import { FiscalProductionRollbackRecoveryNoOpMatrix } from './FiscalProductionRollbackRecoveryNoOpMatrix';
import { FiscalProductionRollbackAbortCriteria } from './FiscalProductionRollbackAbortCriteria';
import { FiscalProductionRollbackReversionDependencyMatrix } from './FiscalProductionRollbackReversionDependencyMatrix';
import { FiscalProductionRollbackReversionBlockerRegister } from './FiscalProductionRollbackReversionBlockerRegister';
import { FiscalProductionRollbackReversionRiskRegister } from './FiscalProductionRollbackReversionRiskRegister';

export class FiscalProductionRollbackReversionEvaluationService {
  public static evaluate(input: FiscalProductionBaselineRollbackInput): FiscalProductionBaselineRollbackResult {
    const policyResult = FiscalProductionRollbackReversionPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionBaselineRollbackResult;
    }

    FiscalProductionBaselineRollbackSimulationMatrix.getMatrix();
    FiscalProductionBaselineAbortNoOpPlan.getPlan();
    FiscalProductionLegacyReversionNoOpPlan.getPlan();
    FiscalProductionReversionPathSafetyMatrix.getMatrix();
    FiscalProductionPostAbortLegacyContinuityPlan.getPlan();
    FiscalProductionNoTrafficMutationDuringRollbackEvidence.getEvidence();
    FiscalProductionNoRealRollbackExecutionEvidence.getEvidence();
    FiscalProductionRollbackRecoveryNoOpMatrix.getMatrix();
    FiscalProductionRollbackAbortCriteria.getCriteria();
    FiscalProductionRollbackReversionDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRollbackReversionPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRollbackReversionBlockerRegister.getBlockers(),
      warnings: FiscalProductionRollbackReversionRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
