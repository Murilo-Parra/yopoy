import { FiscalRealUnlockInput, FiscalRealUnlockResult } from './FiscalRealUnlockSimulationTypes';
import { FiscalRealUnlockPolicy } from './FiscalRealUnlockPolicy';
import { FiscalRealUnlockEligibilityChecklist } from './FiscalRealUnlockEligibilityChecklist';
import { FiscalRealDualApprovalMatrix } from './FiscalRealDualApprovalMatrix';
import { FiscalRealUnlockBlockerRegister } from './FiscalRealUnlockBlockerRegister';
import { FiscalRealUnlockRiskRegister } from './FiscalRealUnlockRiskRegister';

export class FiscalRealUnlockEvaluationService {
  public static evaluate(input: FiscalRealUnlockInput): FiscalRealUnlockResult {
    const policyResult = FiscalRealUnlockPolicy.enforce(input);
    if (policyResult) {
      return policyResult as FiscalRealUnlockResult;
    }

    const result = FiscalRealUnlockPolicy.getBaseResult();
    
    return {
      ...result,
      evaluationExecuted: true,
      dualApprovalSimulated: true,
      go: false,
      noGo: true
    };
  }
}
