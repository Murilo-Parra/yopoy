import { FiscalProductionDualRunInput, FiscalProductionDualRunResult } from './FiscalProductionDualRunTypes';
import { FiscalProductionDualRunPolicy } from './FiscalProductionDualRunPolicy';
import { FiscalProductionDualRunBlockerRegister } from './FiscalProductionDualRunBlockerRegister';
import { FiscalProductionDualRunRiskRegister } from './FiscalProductionDualRunRiskRegister';
import { FiscalProductionDualRunPlan } from './FiscalProductionDualRunPlan';
import { FiscalProductionTelemetryReadinessPlan } from './FiscalProductionTelemetryReadinessPlan';
import { FiscalProductionLegacyVsV2ComparisonPlan } from './FiscalProductionLegacyVsV2ComparisonPlan';
import { FiscalProductionReversibleActivationPlan } from './FiscalProductionReversibleActivationPlan';
import { FiscalProductionActivationObservabilityMatrix } from './FiscalProductionActivationObservabilityMatrix';
import { FiscalProductionDecisionCheckpointMatrix } from './FiscalProductionDecisionCheckpointMatrix';
import { FiscalProductionDualRunRollbackCriteria } from './FiscalProductionDualRunRollbackCriteria';

export class FiscalProductionDualRunEvaluationService {
  public static evaluate(input: FiscalProductionDualRunInput): FiscalProductionDualRunResult {
    const policyResult = FiscalProductionDualRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionDualRunResult;
    }

    // Conceptually generate all artifacts
    FiscalProductionDualRunPlan.generatePlan();
    FiscalProductionTelemetryReadinessPlan.generatePlan();
    FiscalProductionLegacyVsV2ComparisonPlan.generatePlan();
    FiscalProductionReversibleActivationPlan.generatePlan();
    FiscalProductionActivationObservabilityMatrix.generateMatrix();
    FiscalProductionDecisionCheckpointMatrix.generateMatrix();
    FiscalProductionDualRunRollbackCriteria.generateCriteria();

    const baseResult = FiscalProductionDualRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionDualRunBlockerRegister.getBlockers(),
      warnings: FiscalProductionDualRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
