import { FiscalProductionDeploymentIsolationInput, FiscalProductionDeploymentIsolationResult, FiscalProductionDeploymentIsolationStatus } from './FiscalProductionDeploymentIsolationTypes';
import { FiscalProductionDeploymentIsolationEvaluationService } from './FiscalProductionDeploymentIsolationEvaluationService';

export class FiscalProductionDeploymentIsolationDecisionService {
  public static simulateDecision(input: FiscalProductionDeploymentIsolationInput): FiscalProductionDeploymentIsolationResult {
    const evaluation = FiscalProductionDeploymentIsolationEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionDeploymentIsolationStatus.RELEASE_DEPLOYMENT_ISOLATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
