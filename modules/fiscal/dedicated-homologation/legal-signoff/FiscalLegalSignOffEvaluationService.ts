import { FiscalLegalSignOffInput, FiscalLegalSignOffResult } from './FiscalLegalSignOffTypes';
import { FiscalLegalSignOffPolicy } from './FiscalLegalSignOffPolicy';
import { FiscalLegalSignOffCharter } from './FiscalLegalSignOffCharter';
import { FiscalLegalSignerResponsibilityMatrix } from './FiscalLegalSignerResponsibilityMatrix';
import { FiscalLegalNonExecutableSignatureEnvelope } from './FiscalLegalNonExecutableSignatureEnvelope';
import { FiscalLegalEvidenceDependencyMatrix } from './FiscalLegalEvidenceDependencyMatrix';
import { FiscalLegalSignOffReadinessChecklist } from './FiscalLegalSignOffReadinessChecklist';
import { FiscalLegalSignOffBlockerRegister } from './FiscalLegalSignOffBlockerRegister';
import { FiscalLegalSignOffRiskRegister } from './FiscalLegalSignOffRiskRegister';

export class FiscalLegalSignOffEvaluationService {
  public static evaluate(input: FiscalLegalSignOffInput): FiscalLegalSignOffResult {
    const policyResult = FiscalLegalSignOffPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalSignOffResult;
    }

    FiscalLegalSignOffCharter.generateCharter();
    FiscalLegalSignerResponsibilityMatrix.generateMatrix();
    FiscalLegalNonExecutableSignatureEnvelope.generateEnvelope();
    FiscalLegalEvidenceDependencyMatrix.generateMatrix();
    FiscalLegalSignOffReadinessChecklist.generateChecklist();

    const baseResult = FiscalLegalSignOffPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalSignOffBlockerRegister.getBlockers(),
      warnings: FiscalLegalSignOffRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
