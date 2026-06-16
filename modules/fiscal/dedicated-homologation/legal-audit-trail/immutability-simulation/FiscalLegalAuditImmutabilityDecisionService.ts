import { FiscalLegalAuditImmutabilityInput, FiscalLegalAuditImmutabilityResult, FiscalLegalAuditImmutabilityStatus } from './FiscalLegalAuditImmutabilityTypes';
import { FiscalLegalAuditImmutabilityEvaluationService } from './FiscalLegalAuditImmutabilityEvaluationService';

export class FiscalLegalAuditImmutabilityDecisionService {
  public static simulateDecision(input: FiscalLegalAuditImmutabilityInput): FiscalLegalAuditImmutabilityResult {
    const evaluation = FiscalLegalAuditImmutabilityEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalAuditImmutabilityStatus.MOCK_EVIDENCE_SIGNATURE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
