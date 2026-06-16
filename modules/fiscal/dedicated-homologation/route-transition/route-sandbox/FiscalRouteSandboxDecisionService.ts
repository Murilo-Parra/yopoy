import { FiscalRouteSandboxInput, FiscalRouteSandboxResult, FiscalRouteSandboxStatus } from './FiscalRouteSandboxTypes';
import { FiscalRouteSandboxEvaluationService } from './FiscalRouteSandboxEvaluationService';

export class FiscalRouteSandboxDecisionService {
  public static simulateDecision(input: FiscalRouteSandboxInput): FiscalRouteSandboxResult {
    const evaluation = FiscalRouteSandboxEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRouteSandboxStatus.WALLED_GARDEN_ISOLATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
