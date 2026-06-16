import { FiscalFinalGoLiveInput, FiscalFinalGoLiveResult } from './FiscalFinalGoLiveTypes';
import { FiscalFinalGoLivePolicy } from './FiscalFinalGoLivePolicy';
import { FiscalFinalGoLiveBlueprint } from './FiscalFinalGoLiveBlueprint';
import { FiscalFinalGoLiveDependencyInventory } from './FiscalFinalGoLiveDependencyInventory';
import { FiscalFinalGoLiveReadinessChecklist } from './FiscalFinalGoLiveReadinessChecklist';
import { FiscalFinalGoLiveActivationContract } from './FiscalFinalGoLiveActivationContract';
import { FiscalFinalGoLiveTrafficFreezePlan } from './FiscalFinalGoLiveTrafficFreezePlan';
import { FiscalFinalGoLiveLegalDependencyMatrix } from './FiscalFinalGoLiveLegalDependencyMatrix';
import { FiscalFinalGoLiveOperationalDependencyMatrix } from './FiscalFinalGoLiveOperationalDependencyMatrix';
import { FiscalFinalGoLiveProductionDependencyMatrix } from './FiscalFinalGoLiveProductionDependencyMatrix';
import { FiscalFinalGoLiveBlockerRegister } from './FiscalFinalGoLiveBlockerRegister';
import { FiscalFinalGoLiveRiskRegister } from './FiscalFinalGoLiveRiskRegister';

export class FiscalFinalGoLiveEvaluationService {
  public static evaluate(input: FiscalFinalGoLiveInput): FiscalFinalGoLiveResult {
    const policyResult = FiscalFinalGoLivePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalFinalGoLiveResult;
    }

    FiscalFinalGoLiveBlueprint.generateBlueprint();
    FiscalFinalGoLiveDependencyInventory.generateInventory();
    FiscalFinalGoLiveReadinessChecklist.getChecklist();
    FiscalFinalGoLiveActivationContract.generateContract();
    FiscalFinalGoLiveTrafficFreezePlan.generatePlan();
    FiscalFinalGoLiveLegalDependencyMatrix.generateMatrix();
    FiscalFinalGoLiveOperationalDependencyMatrix.generateMatrix();
    FiscalFinalGoLiveProductionDependencyMatrix.generateMatrix();

    const baseResult = FiscalFinalGoLivePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalFinalGoLiveBlockerRegister.getBlockers(),
      warnings: FiscalFinalGoLiveRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
