import { FiscalDay2OperationsClosureInput, FiscalDay2OperationsClosureResult } from './FiscalDay2OperationsClosureTypes';
import { FiscalDay2OperationsClosurePolicy } from './FiscalDay2OperationsClosurePolicy';
import { FiscalDay2OperationsClosureSignOff } from './FiscalDay2OperationsClosureSignOff';
import { FiscalDay2OperationsHandoffNoOpEvidence } from './FiscalDay2OperationsHandoffNoOpEvidence';
import { FiscalDay2OperationsFinalChecklist } from './FiscalDay2OperationsFinalChecklist';
import { FiscalDay2OperationsClosureDependencyMatrix } from './FiscalDay2OperationsClosureDependencyMatrix';
import { FiscalDay2OperationsClosureBlockerRegister } from './FiscalDay2OperationsClosureBlockerRegister';
import { FiscalDay2OperationsClosureRiskRegister } from './FiscalDay2OperationsClosureRiskRegister';

export class FiscalDay2OperationsClosureEvaluationService {
  public static evaluate(input: FiscalDay2OperationsClosureInput): FiscalDay2OperationsClosureResult {
    const policyResult = FiscalDay2OperationsClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalDay2OperationsClosureResult;
    }

    FiscalDay2OperationsClosureSignOff.getSignOff();
    FiscalDay2OperationsHandoffNoOpEvidence.getEvidence();
    FiscalDay2OperationsFinalChecklist.getChecklist();
    FiscalDay2OperationsClosureDependencyMatrix.getMatrix();

    const baseResult = FiscalDay2OperationsClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalDay2OperationsClosureBlockerRegister.getBlockers(),
      warnings: FiscalDay2OperationsClosureRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
