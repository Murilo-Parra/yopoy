import { FiscalProductionRuntimeExecutionGraphInput, FiscalProductionRuntimeExecutionGraphResult } from './FiscalProductionRuntimeExecutionGraphTypes';
import { FiscalProductionRuntimeExecutionGraphPolicy } from './FiscalProductionRuntimeExecutionGraphPolicy';
import { FiscalProductionRuntimeExecutionGraphPlan } from './FiscalProductionRuntimeExecutionGraphPlan';
import { FiscalProductionRuntimeTransactionBoundaryPlan } from './FiscalProductionRuntimeTransactionBoundaryPlan';
import { FiscalProductionRuntimeDbTransactionNoOpPlan } from './FiscalProductionRuntimeDbTransactionNoOpPlan';
import { FiscalProductionRuntimeSefazCallNoOpPlan } from './FiscalProductionRuntimeSefazCallNoOpPlan';
import { FiscalProductionRuntimeSigningNoOpPlan } from './FiscalProductionRuntimeSigningNoOpPlan';
import { FiscalProductionRuntimeIdempotencyCheckpointPlan } from './FiscalProductionRuntimeIdempotencyCheckpointPlan';
import { FiscalProductionRuntimeExecutionTraceNoOpEvidence } from './FiscalProductionRuntimeExecutionTraceNoOpEvidence';
import { FiscalProductionRuntimeExecutionGraphDependencyMatrix } from './FiscalProductionRuntimeExecutionGraphDependencyMatrix';
import { FiscalProductionRuntimeExecutionGraphBlockerRegister } from './FiscalProductionRuntimeExecutionGraphBlockerRegister';
import { FiscalProductionRuntimeExecutionGraphRiskRegister } from './FiscalProductionRuntimeExecutionGraphRiskRegister';

export class FiscalProductionRuntimeExecutionGraphEvaluationService {
  public static evaluate(input: FiscalProductionRuntimeExecutionGraphInput): FiscalProductionRuntimeExecutionGraphResult {
    const policyResult = FiscalProductionRuntimeExecutionGraphPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRuntimeExecutionGraphResult;
    }

    FiscalProductionRuntimeExecutionGraphPlan.generatePlan();
    FiscalProductionRuntimeTransactionBoundaryPlan.generatePlan();
    FiscalProductionRuntimeDbTransactionNoOpPlan.generatePlan();
    FiscalProductionRuntimeSefazCallNoOpPlan.generatePlan();
    FiscalProductionRuntimeSigningNoOpPlan.generatePlan();
    FiscalProductionRuntimeIdempotencyCheckpointPlan.generatePlan();
    FiscalProductionRuntimeExecutionTraceNoOpEvidence.generateEvidence();
    FiscalProductionRuntimeExecutionGraphDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionRuntimeExecutionGraphPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRuntimeExecutionGraphBlockerRegister.getBlockers(),
      warnings: FiscalProductionRuntimeExecutionGraphRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
