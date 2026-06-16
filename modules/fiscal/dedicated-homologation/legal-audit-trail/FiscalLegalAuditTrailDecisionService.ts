import { FiscalLegalAuditTrailInput, FiscalLegalAuditTrailResult, FiscalLegalAuditTrailStatus } from './FiscalLegalAuditTrailTypes';
import { FiscalLegalAuditTrailEvaluationService } from './FiscalLegalAuditTrailEvaluationService';

export class FiscalLegalAuditTrailDecisionService {
  public static simulateDecision(input: FiscalLegalAuditTrailInput): FiscalLegalAuditTrailResult {
    const evaluation = FiscalLegalAuditTrailEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalAuditTrailStatus.LEGAL_AUDIT_LEDGER_BLUEPRINT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
