import { FiscalLegalSignOffClosureInput, FiscalLegalSignOffClosureResult } from './FiscalLegalSignOffClosureTypes';
import { FiscalLegalSignOffClosurePolicy } from './FiscalLegalSignOffClosurePolicy';
import { FiscalLegalSignOffClosureInventory } from './FiscalLegalSignOffClosureInventory';
import { FiscalLegalSignOffFinalChecklist } from './FiscalLegalSignOffFinalChecklist';
import { FiscalLegalSignOffEvidencePackageService } from './FiscalLegalSignOffEvidencePackageService';
import { FiscalLegalFinalSignatureReadiness } from './FiscalLegalFinalSignatureReadiness';
import { FiscalLegalFinalCommitteeHandoffService } from './FiscalLegalFinalCommitteeHandoffService';
import { FiscalLegalPostSignOffRoadmap } from './FiscalLegalPostSignOffRoadmap';
import { FiscalLegalSignOffFinalBlockerRegister } from './FiscalLegalSignOffFinalBlockerRegister';
import { FiscalLegalSignOffFinalRiskRegister } from './FiscalLegalSignOffFinalRiskRegister';

export class FiscalLegalSignOffClosureEvaluationService {
  public static evaluate(input: FiscalLegalSignOffClosureInput): FiscalLegalSignOffClosureResult {
    const policyResult = FiscalLegalSignOffClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalSignOffClosureResult;
    }

    FiscalLegalSignOffClosureInventory.generateInventory();
    FiscalLegalSignOffFinalChecklist.getChecklist();
    FiscalLegalSignOffEvidencePackageService.generatePackage();
    FiscalLegalFinalSignatureReadiness.generateReadiness();
    FiscalLegalFinalCommitteeHandoffService.generateHandoff();
    FiscalLegalPostSignOffRoadmap.generateRoadmap();

    const baseResult = FiscalLegalSignOffClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalSignOffFinalBlockerRegister.getBlockers(),
      warnings: FiscalLegalSignOffFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
