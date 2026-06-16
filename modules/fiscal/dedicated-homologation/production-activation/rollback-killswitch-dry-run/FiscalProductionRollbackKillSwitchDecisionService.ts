import { FiscalProductionRollbackKillSwitchInput, FiscalProductionRollbackKillSwitchResult, FiscalProductionRollbackKillSwitchStatus } from './FiscalProductionRollbackKillSwitchTypes';
import { FiscalProductionRollbackKillSwitchEvaluationService } from './FiscalProductionRollbackKillSwitchEvaluationService';

export class FiscalProductionRollbackKillSwitchDecisionService {
  public static simulateDecision(input: FiscalProductionRollbackKillSwitchInput): FiscalProductionRollbackKillSwitchResult {
    const evaluation = FiscalProductionRollbackKillSwitchEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionRollbackKillSwitchStatus.KILL_SWITCH_GOVERNANCE_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
