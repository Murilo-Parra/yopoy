import { FiscalLegalAuditImmutabilityInput, FiscalLegalAuditImmutabilityResult } from './FiscalLegalAuditImmutabilityTypes';
import { FiscalLegalAuditImmutabilityPolicy } from './FiscalLegalAuditImmutabilityPolicy';
import { FiscalLegalAuditImmutabilityBlockerRegister } from './FiscalLegalAuditImmutabilityBlockerRegister';
import { FiscalLegalAuditImmutabilityRiskRegister } from './FiscalLegalAuditImmutabilityRiskRegister';
import { FiscalLegalAuditHashChainPlan } from './FiscalLegalAuditHashChainPlan';
import { FiscalLegalAuditMockHashProvider } from './FiscalLegalAuditMockHashProvider';
import { FiscalLegalAuditEvidenceDigestBuilder } from './FiscalLegalAuditEvidenceDigestBuilder';
import { FiscalLegalAuditMockEvidenceSignatureEnvelope } from './FiscalLegalAuditMockEvidenceSignatureEnvelope';
import { FiscalLegalAuditMockIntegrityVerifier } from './FiscalLegalAuditMockIntegrityVerifier';
import { FiscalLegalAuditImmutabilityEvidencePackage } from './FiscalLegalAuditImmutabilityEvidencePackage';

export class FiscalLegalAuditImmutabilityEvaluationService {
  public static evaluate(input: FiscalLegalAuditImmutabilityInput): FiscalLegalAuditImmutabilityResult {
    const policyResult = FiscalLegalAuditImmutabilityPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalAuditImmutabilityResult;
    }

    // Call sims to verify correctness conceptually
    FiscalLegalAuditHashChainPlan.generatePlan();
    FiscalLegalAuditMockHashProvider.generateMockHash();
    FiscalLegalAuditEvidenceDigestBuilder.buildDigest();
    FiscalLegalAuditMockEvidenceSignatureEnvelope.generateEnvelope();
    FiscalLegalAuditMockIntegrityVerifier.verify();
    FiscalLegalAuditImmutabilityEvidencePackage.generatePackage();

    const baseResult = FiscalLegalAuditImmutabilityPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalAuditImmutabilityBlockerRegister.getBlockers(),
      warnings: FiscalLegalAuditImmutabilityRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
