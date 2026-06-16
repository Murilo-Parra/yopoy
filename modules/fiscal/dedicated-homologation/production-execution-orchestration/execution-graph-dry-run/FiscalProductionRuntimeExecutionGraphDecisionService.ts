import { FiscalProductionRuntimeExecutionGraphInput, FiscalProductionRuntimeExecutionGraphResult, FiscalProductionRuntimeExecutionGraphStatus } from './FiscalProductionRuntimeExecutionGraphTypes';
import { FiscalProductionRuntimeExecutionGraphEvaluationService } from './FiscalProductionRuntimeExecutionGraphEvaluationService';

export class FiscalProductionRuntimeExecutionGraphDecisionService {
  public static simulateDecision(input: FiscalProductionRuntimeExecutionGraphInput): FiscalProductionRuntimeExecutionGraphResult {
    const evaluation = FiscalProductionRuntimeExecutionGraphEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionRuntimeExecutionGraphStatus.NO_OP_TRANSACTION_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
