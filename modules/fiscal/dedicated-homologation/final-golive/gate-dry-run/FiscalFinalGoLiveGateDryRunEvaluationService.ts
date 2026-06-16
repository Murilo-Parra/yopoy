import { FiscalFinalGoLiveGateDryRunInput, FiscalFinalGoLiveGateDryRunResult } from './FiscalFinalGoLiveGateDryRunTypes';
import { FiscalFinalGoLiveGateDryRunPolicy } from './FiscalFinalGoLiveGateDryRunPolicy';
import { FiscalFinalGoLiveGateEligibilityMatrix } from './FiscalFinalGoLiveGateEligibilityMatrix';
import { FiscalFinalGoLiveMockActivationRunbook } from './FiscalFinalGoLiveMockActivationRunbook';
import { FiscalFinalGoLiveGateUnlockSimulation } from './FiscalFinalGoLiveGateUnlockSimulation';
import { FiscalFinalGoLiveTrafficSwitchSimulation } from './FiscalFinalGoLiveTrafficSwitchSimulation';
import { FiscalFinalGoLiveRollbackSimulationPlan } from './FiscalFinalGoLiveRollbackSimulationPlan';
import { FiscalFinalGoLiveKillSwitchSimulationPlan } from './FiscalFinalGoLiveKillSwitchSimulationPlan';
import { FiscalFinalGoLiveDecisionCheckpointMatrix } from './FiscalFinalGoLiveDecisionCheckpointMatrix';
import { FiscalFinalGoLiveGateDryRunBlockerRegister } from './FiscalFinalGoLiveGateDryRunBlockerRegister';
import { FiscalFinalGoLiveGateDryRunRiskRegister } from './FiscalFinalGoLiveGateDryRunRiskRegister';

export class FiscalFinalGoLiveGateDryRunEvaluationService {
  public static evaluate(input: FiscalFinalGoLiveGateDryRunInput): FiscalFinalGoLiveGateDryRunResult {
    const policyResult = FiscalFinalGoLiveGateDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalFinalGoLiveGateDryRunResult;
    }

    FiscalFinalGoLiveGateEligibilityMatrix.generateMatrix();
    FiscalFinalGoLiveMockActivationRunbook.generateRunbook();
    FiscalFinalGoLiveGateUnlockSimulation.simulateUnlock();
    FiscalFinalGoLiveTrafficSwitchSimulation.simulateSwitch();
    FiscalFinalGoLiveRollbackSimulationPlan.simulateRollback();
    FiscalFinalGoLiveKillSwitchSimulationPlan.simulateKillSwitch();
    FiscalFinalGoLiveDecisionCheckpointMatrix.generateCheckpoints();

    const baseResult = FiscalFinalGoLiveGateDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalFinalGoLiveGateDryRunBlockerRegister.getBlockers(),
      warnings: FiscalFinalGoLiveGateDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
