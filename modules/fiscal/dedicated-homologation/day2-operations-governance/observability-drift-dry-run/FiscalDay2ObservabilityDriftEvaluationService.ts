import { FiscalDay2ObservabilityDriftInput, FiscalDay2ObservabilityDriftResult } from './FiscalDay2ObservabilityDriftTypes';
import { FiscalDay2ObservabilityDriftPolicy } from './FiscalDay2ObservabilityDriftPolicy';
import { FiscalDay2ObservabilityReadinessSimulation } from './FiscalDay2ObservabilityReadinessSimulation';
import { FiscalDay2OperationalSignalCatalog } from './FiscalDay2OperationalSignalCatalog';
import { FiscalDay2LiveMetricsNoCapturePlan } from './FiscalDay2LiveMetricsNoCapturePlan';
import { FiscalDay2MetricsDriftDetectionSimulation } from './FiscalDay2MetricsDriftDetectionSimulation';
import { FiscalDay2DashboardNoOpPlan } from './FiscalDay2DashboardNoOpPlan';
import { FiscalDay2AlertRuleNoActivationPlan } from './FiscalDay2AlertRuleNoActivationPlan';
import { FiscalDay2SloSlaDriftSimulationMatrix } from './FiscalDay2SloSlaDriftSimulationMatrix';
import { FiscalDay2TelemetrySourceNoReadPlan } from './FiscalDay2TelemetrySourceNoReadPlan';
import { FiscalDay2MetricsRetentionNoPersistencePlan } from './FiscalDay2MetricsRetentionNoPersistencePlan';
import { FiscalDay2ObservabilityDriftSafetyChecklist } from './FiscalDay2ObservabilityDriftSafetyChecklist';
import { FiscalDay2ObservabilityDriftDependencyMatrix } from './FiscalDay2ObservabilityDriftDependencyMatrix';
import { FiscalDay2ObservabilityDriftBlockerRegister } from './FiscalDay2ObservabilityDriftBlockerRegister';
import { FiscalDay2ObservabilityDriftRiskRegister } from './FiscalDay2ObservabilityDriftRiskRegister';

export class FiscalDay2ObservabilityDriftEvaluationService {
  public static evaluate(input: FiscalDay2ObservabilityDriftInput): FiscalDay2ObservabilityDriftResult {
    const policyResult = FiscalDay2ObservabilityDriftPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalDay2ObservabilityDriftResult;
    }

    FiscalDay2ObservabilityReadinessSimulation.getSimulation();
    FiscalDay2OperationalSignalCatalog.getCatalog();
    FiscalDay2LiveMetricsNoCapturePlan.getPlan();
    FiscalDay2MetricsDriftDetectionSimulation.getSimulation();
    FiscalDay2DashboardNoOpPlan.getPlan();
    FiscalDay2AlertRuleNoActivationPlan.getPlan();
    FiscalDay2SloSlaDriftSimulationMatrix.getMatrix();
    FiscalDay2TelemetrySourceNoReadPlan.getPlan();
    FiscalDay2MetricsRetentionNoPersistencePlan.getPlan();
    FiscalDay2ObservabilityDriftSafetyChecklist.getChecklist();
    FiscalDay2ObservabilityDriftDependencyMatrix.getMatrix();

    const baseResult = FiscalDay2ObservabilityDriftPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalDay2ObservabilityDriftBlockerRegister.getBlockers(),
      warnings: FiscalDay2ObservabilityDriftRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
