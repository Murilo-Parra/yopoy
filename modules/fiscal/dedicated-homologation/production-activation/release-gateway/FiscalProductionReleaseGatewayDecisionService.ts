import { FiscalProductionReleaseGatewayInput, FiscalProductionReleaseGatewayResult, FiscalProductionReleaseGatewayStatus } from './FiscalProductionReleaseGatewayTypes';
import { FiscalProductionReleaseGatewayEvaluationService } from './FiscalProductionReleaseGatewayEvaluationService';

export class FiscalProductionReleaseGatewayDecisionService {
  public static simulateDecision(input: FiscalProductionReleaseGatewayInput): FiscalProductionReleaseGatewayResult {
    const evaluation = FiscalProductionReleaseGatewayEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionReleaseGatewayStatus.ZERO_EXECUTION_READINESS_VALIDATOR_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
