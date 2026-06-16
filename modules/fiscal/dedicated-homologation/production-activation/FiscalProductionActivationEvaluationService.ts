import { FiscalProductionActivationInput, FiscalProductionActivationResult } from './FiscalProductionActivationTypes';
import { FiscalProductionActivationPolicy } from './FiscalProductionActivationPolicy';
import { FiscalProductionActivationBlockerRegister } from './FiscalProductionActivationBlockerRegister';
import { FiscalProductionActivationRiskRegister } from './FiscalProductionActivationRiskRegister';
import { FiscalProductionActivationBlueprint } from './FiscalProductionActivationBlueprint';
import { FiscalProductionReleaseContract } from './FiscalProductionReleaseContract';
import { FiscalProductionTrafficSwitchPlan } from './FiscalProductionTrafficSwitchPlan';
import { FiscalProductionCanaryActivationPlan } from './FiscalProductionCanaryActivationPlan';
import { FiscalProductionRollbackPlan } from './FiscalProductionRollbackPlan';
import { FiscalProductionKillSwitchPlan } from './FiscalProductionKillSwitchPlan';
import { FiscalProductionReadinessChecklist } from './FiscalProductionReadinessChecklist';
import { FiscalProductionDependencyInventory } from './FiscalProductionDependencyInventory';

export class FiscalProductionActivationEvaluationService {
  public static evaluate(input: FiscalProductionActivationInput): FiscalProductionActivationResult {
    const policyResult = FiscalProductionActivationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionActivationResult;
    }

    // Conceptually generate all
    FiscalProductionActivationBlueprint.generateBlueprint();
    FiscalProductionReleaseContract.generateContract();
    FiscalProductionTrafficSwitchPlan.generatePlan();
    FiscalProductionCanaryActivationPlan.generatePlan();
    FiscalProductionRollbackPlan.generatePlan();
    FiscalProductionKillSwitchPlan.generatePlan();
    FiscalProductionReadinessChecklist.generateChecklist();
    FiscalProductionDependencyInventory.generateInventory();

    const baseResult = FiscalProductionActivationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionActivationBlockerRegister.getBlockers(),
      warnings: FiscalProductionActivationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
