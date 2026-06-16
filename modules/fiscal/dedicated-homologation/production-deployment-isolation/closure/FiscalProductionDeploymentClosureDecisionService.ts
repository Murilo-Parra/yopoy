import { FiscalProductionDeploymentClosureInput, FiscalProductionDeploymentClosureResult, FiscalProductionDeploymentClosureStatus } from './FiscalProductionDeploymentClosureTypes';
import { FiscalProductionDeploymentClosureEvaluationService } from './FiscalProductionDeploymentClosureEvaluationService';

export class FiscalProductionDeploymentClosureDecisionService {
  public static simulateDecision(input: FiscalProductionDeploymentClosureInput): FiscalProductionDeploymentClosureResult {
    const evaluation = FiscalProductionDeploymentClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionDeploymentClosureStatus.NO_ACTIVATION_HANDOFF_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
