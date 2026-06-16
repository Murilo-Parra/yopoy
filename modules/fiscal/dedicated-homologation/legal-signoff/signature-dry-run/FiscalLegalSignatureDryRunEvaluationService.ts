import { FiscalLegalSignatureDryRunInput, FiscalLegalSignatureDryRunResult } from './FiscalLegalSignatureDryRunTypes';
import { FiscalLegalSignatureDryRunPolicy } from './FiscalLegalSignatureDryRunPolicy';
import { FiscalLegalSignerEligibilityMatrix } from './FiscalLegalSignerEligibilityMatrix';
import { FiscalLegalSignatureIntentEnvelope } from './FiscalLegalSignatureIntentEnvelope';
import { FiscalLegalMockSignatureWorkflow } from './FiscalLegalMockSignatureWorkflow';
import { FiscalLegalSignerQuorumSimulation } from './FiscalLegalSignerQuorumSimulation';
import { FiscalLegalSignOffSoDReview } from './FiscalLegalSignOffSoDReview';
import { FiscalLegalSignatureEvidenceReview } from './FiscalLegalSignatureEvidenceReview';
import { FiscalLegalSignatureDryRunBlockerRegister } from './FiscalLegalSignatureDryRunBlockerRegister';
import { FiscalLegalSignatureDryRunRiskRegister } from './FiscalLegalSignatureDryRunRiskRegister';

export class FiscalLegalSignatureDryRunEvaluationService {
  public static evaluate(input: FiscalLegalSignatureDryRunInput): FiscalLegalSignatureDryRunResult {
    const policyResult = FiscalLegalSignatureDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalSignatureDryRunResult;
    }

    FiscalLegalSignerEligibilityMatrix.generateMatrix();
    FiscalLegalSignatureIntentEnvelope.generateEnvelope();
    FiscalLegalMockSignatureWorkflow.simulateWorkflow();
    FiscalLegalSignerQuorumSimulation.simulateQuorum();
    FiscalLegalSignOffSoDReview.simulateReview(input);
    FiscalLegalSignatureEvidenceReview.simulateReview();

    const baseResult = FiscalLegalSignatureDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalSignatureDryRunBlockerRegister.getBlockers(),
      warnings: FiscalLegalSignatureDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
