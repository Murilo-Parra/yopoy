import { FiscalProductionExecutionOrchestrationInput, FiscalProductionExecutionOrchestrationResult } from './FiscalProductionExecutionOrchestrationTypes';
import { FiscalProductionExecutionOrchestrationPolicy } from './FiscalProductionExecutionOrchestrationPolicy';
import { FiscalProductionExecutionOrchestrationBlueprint } from './FiscalProductionExecutionOrchestrationBlueprint';
import { FiscalProductionRuntimeNoOpSafetyContract } from './FiscalProductionRuntimeNoOpSafetyContract';
import { FiscalProductionExecutionRuntimePlan } from './FiscalProductionExecutionRuntimePlan';
import { FiscalProductionExecutionCommandBoundaryPlan } from './FiscalProductionExecutionCommandBoundaryPlan';
import { FiscalProductionExecutionGuardrailMatrix } from './FiscalProductionExecutionGuardrailMatrix';
import { FiscalProductionExecutionPreRunChecklist } from './FiscalProductionExecutionPreRunChecklist';
import { FiscalProductionExecutionOrchestrationNoSideEffectEvidence } from './FiscalProductionExecutionOrchestrationNoSideEffectEvidence';
import { FiscalProductionExecutionDependencyMatrix } from './FiscalProductionExecutionDependencyMatrix';
import { FiscalProductionExecutionOrchestrationBlockerRegister } from './FiscalProductionExecutionOrchestrationBlockerRegister';
import { FiscalProductionExecutionOrchestrationRiskRegister } from './FiscalProductionExecutionOrchestrationRiskRegister';

export class FiscalProductionExecutionOrchestrationEvaluationService {
  public static evaluate(input: FiscalProductionExecutionOrchestrationInput): FiscalProductionExecutionOrchestrationResult {
    const policyResult = FiscalProductionExecutionOrchestrationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionExecutionOrchestrationResult;
    }

    FiscalProductionExecutionOrchestrationBlueprint.generateBlueprint();
    FiscalProductionRuntimeNoOpSafetyContract.generateContract();
    FiscalProductionExecutionRuntimePlan.generatePlan();
    FiscalProductionExecutionCommandBoundaryPlan.generatePlan();
    FiscalProductionExecutionGuardrailMatrix.getMatrix();
    FiscalProductionExecutionPreRunChecklist.generateChecklist();
    FiscalProductionExecutionOrchestrationNoSideEffectEvidence.generateEvidence();
    FiscalProductionExecutionDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionExecutionOrchestrationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionExecutionOrchestrationBlockerRegister.getBlockers(),
      warnings: FiscalProductionExecutionOrchestrationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
