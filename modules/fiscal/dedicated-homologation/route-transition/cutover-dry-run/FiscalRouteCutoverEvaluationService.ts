import { FiscalRouteCutoverInput, FiscalRouteCutoverResult } from './FiscalRouteCutoverDryRunTypes';
import { FiscalRouteCutoverPolicy } from './FiscalRouteCutoverPolicy';
import { FiscalRouteCutoverWindowPlan } from './FiscalRouteCutoverWindowPlan';
import { FiscalRouteCutoverSimulationPlan } from './FiscalRouteCutoverSimulationPlan';
import { FiscalRouteLegacyFallbackGovernancePlan } from './FiscalRouteLegacyFallbackGovernancePlan';
import { FiscalRouteShadowRollbackPlan } from './FiscalRouteShadowRollbackPlan';
import { FiscalRouteCutoverAbortCriteria } from './FiscalRouteCutoverAbortCriteria';
import { FiscalRouteCutoverDecisionMatrix } from './FiscalRouteCutoverDecisionMatrix';
import { FiscalRouteCutoverReadinessChecklist } from './FiscalRouteCutoverReadinessChecklist';
import { FiscalRouteCutoverDependencyMatrix } from './FiscalRouteCutoverDependencyMatrix';
import { FiscalRouteCutoverBlockerRegister } from './FiscalRouteCutoverBlockerRegister';
import { FiscalRouteCutoverRiskRegister } from './FiscalRouteCutoverRiskRegister';

export class FiscalRouteCutoverEvaluationService {
  public static evaluate(input: FiscalRouteCutoverInput): FiscalRouteCutoverResult {
    const policyResult = FiscalRouteCutoverPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteCutoverResult;
    }

    FiscalRouteCutoverWindowPlan.generatePlan();
    FiscalRouteCutoverSimulationPlan.simulate();
    FiscalRouteLegacyFallbackGovernancePlan.generateGovernance();
    FiscalRouteShadowRollbackPlan.generatePlan();
    FiscalRouteCutoverAbortCriteria.generateCriteria();
    FiscalRouteCutoverDecisionMatrix.generateMatrix();
    FiscalRouteCutoverReadinessChecklist.generateChecklist();
    FiscalRouteCutoverDependencyMatrix.generateMatrix();

    const baseResult = FiscalRouteCutoverPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteCutoverBlockerRegister.getBlockers(),
      warnings: FiscalRouteCutoverRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
