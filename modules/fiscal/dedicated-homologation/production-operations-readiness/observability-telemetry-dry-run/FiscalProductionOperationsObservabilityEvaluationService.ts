import { FiscalProductionOperationsObservabilityInput, FiscalProductionOperationsObservabilityResult } from './FiscalProductionOperationsObservabilityTypes';
import { FiscalProductionOperationsObservabilityPolicy } from './FiscalProductionOperationsObservabilityPolicy';
import { FiscalProductionOperationsObservabilityReadinessSimulation } from './FiscalProductionOperationsObservabilityReadinessSimulation';
import { FiscalProductionOperationsSignalCatalog } from './FiscalProductionOperationsSignalCatalog';
import { FiscalProductionOperationsTelemetryNoCapturePlan } from './FiscalProductionOperationsTelemetryNoCapturePlan';
import { FiscalProductionOperationsLiveMetricsDriftSimulation } from './FiscalProductionOperationsLiveMetricsDriftSimulation';
import { FiscalProductionOperationsDashboardNoOpPlan } from './FiscalProductionOperationsDashboardNoOpPlan';
import { FiscalProductionOperationsSloSlaSimulationMatrix } from './FiscalProductionOperationsSloSlaSimulationMatrix';
import { FiscalProductionOperationsAlertRuleNoActivationPlan } from './FiscalProductionOperationsAlertRuleNoActivationPlan';
import { FiscalProductionOperationsTelemetrySourceNoReadPlan } from './FiscalProductionOperationsTelemetrySourceNoReadPlan';
import { FiscalProductionOperationsMetricsRetentionNoPersistencePlan } from './FiscalProductionOperationsMetricsRetentionNoPersistencePlan';
import { FiscalProductionOperationsNoRealMetricsCaptureEvidence } from './FiscalProductionOperationsNoRealMetricsCaptureEvidence';
import { FiscalProductionOperationsNoRealAlertEvidence } from './FiscalProductionOperationsNoRealAlertEvidence';
import { FiscalProductionOperationsObservabilityDependencyMatrix } from './FiscalProductionOperationsObservabilityDependencyMatrix';
import { FiscalProductionOperationsObservabilityBlockerRegister } from './FiscalProductionOperationsObservabilityBlockerRegister';
import { FiscalProductionOperationsObservabilityRiskRegister } from './FiscalProductionOperationsObservabilityRiskRegister';

export class FiscalProductionOperationsObservabilityEvaluationService {
  public static evaluate(input: FiscalProductionOperationsObservabilityInput): FiscalProductionOperationsObservabilityResult {
    const policyResult = FiscalProductionOperationsObservabilityPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsObservabilityResult;
    }

    FiscalProductionOperationsObservabilityReadinessSimulation.getSimulation();
    FiscalProductionOperationsSignalCatalog.getCatalog();
    FiscalProductionOperationsTelemetryNoCapturePlan.getPlan();
    FiscalProductionOperationsLiveMetricsDriftSimulation.getSimulation();
    FiscalProductionOperationsDashboardNoOpPlan.getPlan();
    FiscalProductionOperationsSloSlaSimulationMatrix.getMatrix();
    FiscalProductionOperationsAlertRuleNoActivationPlan.getPlan();
    FiscalProductionOperationsTelemetrySourceNoReadPlan.getPlan();
    FiscalProductionOperationsMetricsRetentionNoPersistencePlan.getPlan();
    FiscalProductionOperationsNoRealMetricsCaptureEvidence.getEvidence();
    FiscalProductionOperationsNoRealAlertEvidence.getEvidence();
    FiscalProductionOperationsObservabilityDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionOperationsObservabilityPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsObservabilityBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsObservabilityRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
