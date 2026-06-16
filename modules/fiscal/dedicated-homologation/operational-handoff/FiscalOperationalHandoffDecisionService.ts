import { FiscalOperationalHandoffInput, FiscalOperationalHandoffResult, FiscalOperationalHandoffStatus } from './FiscalOperationalHandoffTypes';
import { FiscalOperationalHandoffEvaluationService } from './FiscalOperationalHandoffEvaluationService';

export class FiscalOperationalHandoffDecisionService {
  public static simulateDecision(input: FiscalOperationalHandoffInput): FiscalOperationalHandoffResult {
    const evaluation = FiscalOperationalHandoffEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalOperationalHandoffStatus.RUNBOOK_READINESS_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
