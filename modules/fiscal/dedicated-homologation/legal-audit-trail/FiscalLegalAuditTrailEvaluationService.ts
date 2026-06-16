import { FiscalLegalAuditTrailInput, FiscalLegalAuditTrailResult } from './FiscalLegalAuditTrailTypes';
import { FiscalLegalAuditTrailPolicy } from './FiscalLegalAuditTrailPolicy';
import { FiscalLegalAuditTrailBlockerRegister } from './FiscalLegalAuditTrailBlockerRegister';
import { FiscalLegalAuditTrailRiskRegister } from './FiscalLegalAuditTrailRiskRegister';
import { FiscalLegalAuditTrailLedgerBlueprint } from './FiscalLegalAuditTrailLedgerBlueprint';
import { FiscalLegalAuditTrailPersistenceIsolationContract } from './FiscalLegalAuditTrailPersistenceIsolationContract';
import { FiscalLegalAuditTrailImmutabilityContract } from './FiscalLegalAuditTrailImmutabilityContract';
import { FiscalLegalAuditTrailRetentionPolicy } from './FiscalLegalAuditTrailRetentionPolicy';
import { FiscalLegalAuditTrailAccessControlMatrix } from './FiscalLegalAuditTrailAccessControlMatrix';
import { FiscalLegalAuditTrailEvidenceModel } from './FiscalLegalAuditTrailEvidenceModel';

export class FiscalLegalAuditTrailEvaluationService {
  public static evaluate(input: FiscalLegalAuditTrailInput): FiscalLegalAuditTrailResult {
    const policyResult = FiscalLegalAuditTrailPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalAuditTrailResult;
    }

    const bp = FiscalLegalAuditTrailLedgerBlueprint.generateBlueprint();
    const iso = FiscalLegalAuditTrailPersistenceIsolationContract.generateContract();
    const imm = FiscalLegalAuditTrailImmutabilityContract.generateContract();
    const ret = FiscalLegalAuditTrailRetentionPolicy.generatePolicy();
    const acm = FiscalLegalAuditTrailAccessControlMatrix.generateMatrix();
    const evm = FiscalLegalAuditTrailEvidenceModel.generateModel();

    const baseResult = FiscalLegalAuditTrailPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalAuditTrailBlockerRegister.getBlockers(),
      warnings: FiscalLegalAuditTrailRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
