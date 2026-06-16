import { FiscalOperationalHandoffClosureInput, FiscalOperationalHandoffClosureResult } from './FiscalOperationalHandoffClosureTypes';
import { FiscalOperationalHandoffClosurePolicy } from './FiscalOperationalHandoffClosurePolicy';
import { FiscalOperationalHandoffClosureInventory } from './FiscalOperationalHandoffClosureInventory';
import { FiscalOperationalHandoffFinalChecklist } from './FiscalOperationalHandoffFinalChecklist';
import { FiscalOperationalHandoffEvidencePackageService } from './FiscalOperationalHandoffEvidencePackageService';
import { FiscalOperationalLegalSignOffReadiness } from './FiscalOperationalLegalSignOffReadiness';
import { FiscalOperationalFinalRunbookHandoffService } from './FiscalOperationalFinalRunbookHandoffService';
import { FiscalOperationalPostHandoffRoadmap } from './FiscalOperationalPostHandoffRoadmap';
import { FiscalOperationalHandoffFinalBlockerRegister } from './FiscalOperationalHandoffFinalBlockerRegister';
import { FiscalOperationalHandoffFinalRiskRegister } from './FiscalOperationalHandoffFinalRiskRegister';

export class FiscalOperationalHandoffClosureEvaluationService {
  public static evaluate(input: FiscalOperationalHandoffClosureInput): FiscalOperationalHandoffClosureResult {
    const policyResult = FiscalOperationalHandoffClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalOperationalHandoffClosureResult;
    }

    FiscalOperationalHandoffClosureInventory.generateInventory();
    FiscalOperationalHandoffFinalChecklist.generateChecklist();
    FiscalOperationalHandoffEvidencePackageService.generatePackage();
    FiscalOperationalLegalSignOffReadiness.generateReadiness();
    FiscalOperationalFinalRunbookHandoffService.generateHandoff();
    FiscalOperationalPostHandoffRoadmap.generateRoadmap();

    const baseResult = FiscalOperationalHandoffClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalOperationalHandoffFinalBlockerRegister.getBlockers(),
      warnings: FiscalOperationalHandoffFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
