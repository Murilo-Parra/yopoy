import { FiscalProductionExecutionBoundaryInput, FiscalProductionExecutionBoundaryResult, FiscalProductionExecutionBoundaryStatus } from './FiscalProductionExecutionBoundaryTypes';
import { FiscalProductionExecutionBoundaryEvaluationService } from './FiscalProductionExecutionBoundaryEvaluationService';

export class FiscalProductionExecutionBoundaryDecisionService {
  public static simulateDecision(input: FiscalProductionExecutionBoundaryInput): FiscalProductionExecutionBoundaryResult {
    const evaluation = FiscalProductionExecutionBoundaryEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionExecutionBoundaryStatus.AUTHORIZATION_BOUNDARY_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
