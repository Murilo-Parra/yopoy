import { FiscalRouteProxyDryRunInput, FiscalRouteProxyDryRunResult, FiscalRouteProxyDryRunStatus } from './FiscalRouteProxyDryRunTypes';
import { FiscalRouteProxyDryRunEvaluationService } from './FiscalRouteProxyDryRunEvaluationService';

export class FiscalRouteProxyDryRunDecisionService {
  public static simulateDecision(input: FiscalRouteProxyDryRunInput): FiscalRouteProxyDryRunResult {
    const evaluation = FiscalRouteProxyDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteProxyDryRunStatus.NO_INTERCEPTION_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
