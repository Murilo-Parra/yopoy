import { FiscalProductionAuthorizationDeliberationInput, FiscalProductionAuthorizationDeliberationResult } from './FiscalProductionAuthorizationDeliberationTypes';
import { FiscalProductionAuthorizationDeliberationPolicy } from './FiscalProductionAuthorizationDeliberationPolicy';
import { FiscalProductionAuthorizationDeliberationCharter } from './FiscalProductionAuthorizationDeliberationCharter';
import { FiscalProductionAuthorizationQuorumSimulation } from './FiscalProductionAuthorizationQuorumSimulation';
import { FiscalProductionAuthorityVoteSimulation } from './FiscalProductionAuthorityVoteSimulation';
import { FiscalProductionGatePreconditionReview } from './FiscalProductionGatePreconditionReview';
import { FiscalProductionConsentEvidenceReviewMatrix } from './FiscalProductionConsentEvidenceReviewMatrix';
import { FiscalProductionSoDRevalidationMatrix } from './FiscalProductionSoDRevalidationMatrix';
import { FiscalProductionRiskAcceptanceNoOpReview } from './FiscalProductionRiskAcceptanceNoOpReview';
import { FiscalProductionDeliberationNoPersistenceEvidence } from './FiscalProductionDeliberationNoPersistenceEvidence';
import { FiscalProductionAuthorizationDeliberationDependencyMatrix } from './FiscalProductionAuthorizationDeliberationDependencyMatrix';
import { FiscalProductionAuthorizationDeliberationBlockerRegister } from './FiscalProductionAuthorizationDeliberationBlockerRegister';
import { FiscalProductionAuthorizationDeliberationRiskRegister } from './FiscalProductionAuthorizationDeliberationRiskRegister';

export class FiscalProductionAuthorizationDeliberationEvaluationService {
  public static evaluate(input: FiscalProductionAuthorizationDeliberationInput): FiscalProductionAuthorizationDeliberationResult {
    const policyResult = FiscalProductionAuthorizationDeliberationPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionAuthorizationDeliberationResult;
    }

    FiscalProductionAuthorizationDeliberationCharter.getCharter();
    FiscalProductionAuthorizationQuorumSimulation.getSimulation();
    FiscalProductionAuthorityVoteSimulation.getSimulation();
    FiscalProductionGatePreconditionReview.getReview();
    FiscalProductionConsentEvidenceReviewMatrix.getMatrix();
    FiscalProductionSoDRevalidationMatrix.getMatrix();
    FiscalProductionRiskAcceptanceNoOpReview.getReview();
    FiscalProductionDeliberationNoPersistenceEvidence.getEvidence();
    FiscalProductionAuthorizationDeliberationDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionAuthorizationDeliberationPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionAuthorizationDeliberationBlockerRegister.getBlockers(),
      warnings: FiscalProductionAuthorizationDeliberationRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
