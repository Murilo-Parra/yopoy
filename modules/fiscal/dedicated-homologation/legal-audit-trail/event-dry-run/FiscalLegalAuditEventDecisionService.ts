import { FiscalLegalAuditEventDryRunInput, FiscalLegalAuditEventDryRunResult, FiscalLegalAuditEventDryRunStatus } from './FiscalLegalAuditEventDryRunTypes';
import { FiscalLegalAuditEventEvaluationService } from './FiscalLegalAuditEventEvaluationService';

export class FiscalLegalAuditEventDecisionService {
  public static simulateDecision(input: FiscalLegalAuditEventDryRunInput): FiscalLegalAuditEventDryRunResult {
    const evaluation = FiscalLegalAuditEventEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalAuditEventDryRunStatus.CONTROLLED_LEDGER_DML_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
