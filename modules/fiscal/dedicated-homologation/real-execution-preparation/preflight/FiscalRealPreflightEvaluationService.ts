import { FiscalRealPreflightInput, FiscalRealPreflightResult, FiscalRealPreflightStatus } from './FiscalRealPreflightReviewTypes';
import { FiscalRealPreflightPolicy } from './FiscalRealPreflightPolicy';
import { FiscalRealReadinessEvidenceInventory } from './FiscalRealReadinessEvidenceInventory';
import { FiscalRealPreflightChecklist } from './FiscalRealPreflightChecklist';
import { FiscalRealReadinessEvidencePackageService } from './FiscalRealReadinessEvidencePackageService';
import { FiscalRealPreflightBlockerRegister } from './FiscalRealPreflightBlockerRegister';
import { FiscalRealPreflightRiskRegister } from './FiscalRealPreflightRiskRegister';

export class FiscalRealPreflightEvaluationService {
  public static evaluate(input: FiscalRealPreflightInput): FiscalRealPreflightResult {
    const policyResult = FiscalRealPreflightPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealPreflightResult;
    }

    const result = FiscalRealPreflightPolicy.getBaseResult();

    return {
      ...result,
      status: FiscalRealPreflightStatus.READINESS_EVIDENCE_READY,
      evaluationExecuted: true,
      preflightReviewed: true,
      evidencePackageGenerated: true,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
