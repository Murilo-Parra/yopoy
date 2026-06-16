import { FiscalProductionCanaryTrafficSwitchInput, FiscalProductionCanaryTrafficSwitchResult } from './FiscalProductionCanaryTrafficSwitchTypes';
import { FiscalProductionCanaryTrafficSwitchPolicy } from './FiscalProductionCanaryTrafficSwitchPolicy';
import { FiscalProductionCanaryTrafficSimulationPlan } from './FiscalProductionCanaryTrafficSimulationPlan';
import { FiscalProductionReversibleActivationPlan } from './FiscalProductionReversibleActivationPlan';
import { FiscalProductionTrafficSwitchSafetyMatrix } from './FiscalProductionTrafficSwitchSafetyMatrix';
import { FiscalProductionCanaryPercentageSimulation } from './FiscalProductionCanaryPercentageSimulation';
import { FiscalProductionLegacyReversionPlan } from './FiscalProductionLegacyReversionPlan';
import { FiscalProductionCanaryAbortCriteria } from './FiscalProductionCanaryAbortCriteria';
import { FiscalProductionCanaryDecisionCheckpointMatrix } from './FiscalProductionCanaryDecisionCheckpointMatrix';
import { FiscalProductionCanaryDependencyMatrix } from './FiscalProductionCanaryDependencyMatrix';
import { FiscalProductionCanaryTrafficSwitchBlockerRegister } from './FiscalProductionCanaryTrafficSwitchBlockerRegister';
import { FiscalProductionCanaryTrafficSwitchRiskRegister } from './FiscalProductionCanaryTrafficSwitchRiskRegister';

export class FiscalProductionCanaryTrafficSwitchEvaluationService {
  public static evaluate(input: FiscalProductionCanaryTrafficSwitchInput): FiscalProductionCanaryTrafficSwitchResult {
    const policyResult = FiscalProductionCanaryTrafficSwitchPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCanaryTrafficSwitchResult;
    }

    FiscalProductionCanaryTrafficSimulationPlan.generatePlan();
    FiscalProductionReversibleActivationPlan.generatePlan();
    FiscalProductionTrafficSwitchSafetyMatrix.generateMatrix();
    FiscalProductionCanaryPercentageSimulation.simulatePercentage();
    FiscalProductionLegacyReversionPlan.generatePlan();
    FiscalProductionCanaryAbortCriteria.generateCriteria();
    FiscalProductionCanaryDecisionCheckpointMatrix.generateMatrix();
    FiscalProductionCanaryDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionCanaryTrafficSwitchPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCanaryTrafficSwitchBlockerRegister.getBlockers(),
      warnings: FiscalProductionCanaryTrafficSwitchRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
