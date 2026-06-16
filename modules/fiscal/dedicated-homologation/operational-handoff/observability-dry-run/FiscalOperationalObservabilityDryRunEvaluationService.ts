import { FiscalOperationalObservabilityDryRunInput, FiscalOperationalObservabilityDryRunResult } from './FiscalOperationalObservabilityDryRunTypes';
import { FiscalOperationalObservabilityDryRunPolicy } from './FiscalOperationalObservabilityDryRunPolicy';
import { FiscalOperationalSignalCatalog } from './FiscalOperationalSignalCatalog';
import { FiscalOperationalAlertingDryRunPlan } from './FiscalOperationalAlertingDryRunPlan';
import { FiscalOperationalDashboardReadinessPlan } from './FiscalOperationalDashboardReadinessPlan';
import { FiscalOperationalSloSlaMatrix } from './FiscalOperationalSloSlaMatrix';
import { FiscalOperationalIncidentTriggerSimulation } from './FiscalOperationalIncidentTriggerSimulation';
import { FiscalOperationalTelemetryRetentionPlan } from './FiscalOperationalTelemetryRetentionPlan';
import { FiscalOperationalEscalationSignalMatrix } from './FiscalOperationalEscalationSignalMatrix';
import { FiscalOperationalObservabilityDryRunBlockerRegister } from './FiscalOperationalObservabilityDryRunBlockerRegister';
import { FiscalOperationalObservabilityDryRunRiskRegister } from './FiscalOperationalObservabilityDryRunRiskRegister';

export class FiscalOperationalObservabilityDryRunEvaluationService {
  public static evaluate(input: FiscalOperationalObservabilityDryRunInput): FiscalOperationalObservabilityDryRunResult {
    const policyResult = FiscalOperationalObservabilityDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalOperationalObservabilityDryRunResult;
    }

    FiscalOperationalSignalCatalog.generateCatalog();
    FiscalOperationalAlertingDryRunPlan.generatePlan();
    FiscalOperationalDashboardReadinessPlan.generatePlan();
    FiscalOperationalSloSlaMatrix.generateMatrix();
    FiscalOperationalIncidentTriggerSimulation.generateSimulation();
    FiscalOperationalTelemetryRetentionPlan.generatePlan();
    FiscalOperationalEscalationSignalMatrix.generateMatrix();

    const baseResult = FiscalOperationalObservabilityDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalOperationalObservabilityDryRunBlockerRegister.getBlockers(),
      warnings: FiscalOperationalObservabilityDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
