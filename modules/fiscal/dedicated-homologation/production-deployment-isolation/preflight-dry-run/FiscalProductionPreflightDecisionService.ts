import { FiscalProductionPreflightInput, FiscalProductionPreflightResult, FiscalProductionPreflightStatus } from './FiscalProductionPreflightTypes';
import { FiscalProductionPreflightEvaluationService } from './FiscalProductionPreflightEvaluationService';

export class FiscalProductionPreflightDecisionService {
  public static simulateDecision(input: FiscalProductionPreflightInput): FiscalProductionPreflightResult {
    const evaluation = FiscalProductionPreflightEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionPreflightStatus.DEPLOYMENT_READINESS_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
