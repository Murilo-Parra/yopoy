import { FiscalLegalAuditClosureInput, FiscalLegalAuditClosureResult, FiscalLegalAuditClosureStatus } from './FiscalLegalAuditClosureTypes';
import { FiscalLegalAuditClosureEvaluationService } from './FiscalLegalAuditClosureEvaluationService';

export class FiscalLegalAuditClosureDecisionService {
  public static simulateDecision(input: FiscalLegalAuditClosureInput): FiscalLegalAuditClosureResult {
    const evaluation = FiscalLegalAuditClosureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalAuditClosureStatus.AUDITOR_HANDOFF_EVIDENCE_PACKAGE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
