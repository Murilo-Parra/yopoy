import { FiscalProductionRollbackKillSwitchInput, FiscalProductionRollbackKillSwitchResult } from './FiscalProductionRollbackKillSwitchTypes';
import { FiscalProductionRollbackKillSwitchPolicy } from './FiscalProductionRollbackKillSwitchPolicy';
import { FiscalProductionRollbackKillSwitchBlockerRegister } from './FiscalProductionRollbackKillSwitchBlockerRegister';
import { FiscalProductionRollbackKillSwitchRiskRegister } from './FiscalProductionRollbackKillSwitchRiskRegister';
import { FiscalProductionRollbackDryRunPlan } from './FiscalProductionRollbackDryRunPlan';
import { FiscalProductionKillSwitchDryRunPlan } from './FiscalProductionKillSwitchDryRunPlan';
import { FiscalProductionLegacyFallbackPlan } from './FiscalProductionLegacyFallbackPlan';
import { FiscalProductionReleaseFreezePlan } from './FiscalProductionReleaseFreezePlan';
import { FiscalProductionTrafficReversionPlan } from './FiscalProductionTrafficReversionPlan';
import { FiscalProductionRollbackDependencyMatrix } from './FiscalProductionRollbackDependencyMatrix';
import { FiscalProductionKillSwitchReadinessMatrix } from './FiscalProductionKillSwitchReadinessMatrix';

export class FiscalProductionRollbackKillSwitchEvaluationService {
  public static evaluate(input: FiscalProductionRollbackKillSwitchInput): FiscalProductionRollbackKillSwitchResult {
    const policyResult = FiscalProductionRollbackKillSwitchPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionRollbackKillSwitchResult;
    }

    // Conceptually generate all artifacts
    FiscalProductionRollbackDryRunPlan.generatePlan();
    FiscalProductionKillSwitchDryRunPlan.generatePlan();
    FiscalProductionLegacyFallbackPlan.generatePlan();
    FiscalProductionReleaseFreezePlan.generatePlan();
    FiscalProductionTrafficReversionPlan.generatePlan();
    FiscalProductionRollbackDependencyMatrix.generateMatrix();
    FiscalProductionKillSwitchReadinessMatrix.generateMatrix();

    const baseResult = FiscalProductionRollbackKillSwitchPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionRollbackKillSwitchBlockerRegister.getBlockers(),
      warnings: FiscalProductionRollbackKillSwitchRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
