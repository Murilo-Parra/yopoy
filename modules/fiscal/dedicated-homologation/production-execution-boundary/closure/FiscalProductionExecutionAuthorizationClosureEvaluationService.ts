import { FiscalProductionExecutionAuthorizationClosureInput, FiscalProductionExecutionAuthorizationClosureResult } from './FiscalProductionExecutionAuthorizationClosureTypes';
import { FiscalProductionExecutionAuthorizationClosurePolicy } from './FiscalProductionExecutionAuthorizationClosurePolicy';
import { FiscalProductionExecutionAuthorizationClosureInventory } from './FiscalProductionExecutionAuthorizationClosureInventory';
import { FiscalProductionExecutionAuthorizationFinalChecklist } from './FiscalProductionExecutionAuthorizationFinalChecklist';
import { FiscalProductionExecutionAuthorizationEvidencePackageService } from './FiscalProductionExecutionAuthorizationEvidencePackageService';
import { FiscalProductionExecutionNoExecutionHandoffService } from './FiscalProductionExecutionNoExecutionHandoffService';
import { FiscalProductionExecutionPostClosureRoadmap } from './FiscalProductionExecutionPostClosureRoadmap';
import { FiscalProductionExecutionAuthorizationFinalBlockerRegister } from './FiscalProductionExecutionAuthorizationFinalBlockerRegister';
import { FiscalProductionExecutionAuthorizationFinalRiskRegister } from './FiscalProductionExecutionAuthorizationFinalRiskRegister';

export class FiscalProductionExecutionAuthorizationClosureEvaluationService {
  public static evaluate(input: FiscalProductionExecutionAuthorizationClosureInput): FiscalProductionExecutionAuthorizationClosureResult {
    const policyResult = FiscalProductionExecutionAuthorizationClosurePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionExecutionAuthorizationClosureResult;
    }

    FiscalProductionExecutionAuthorizationClosureInventory.generateInventory();
    FiscalProductionExecutionAuthorizationFinalChecklist.generateChecklist();
    FiscalProductionExecutionAuthorizationEvidencePackageService.generatePackage();
    FiscalProductionExecutionNoExecutionHandoffService.generateHandoff();
    FiscalProductionExecutionPostClosureRoadmap.generateRoadmap();

    const baseResult = FiscalProductionExecutionAuthorizationClosurePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionExecutionAuthorizationFinalBlockerRegister.getBlockers(),
      warnings: FiscalProductionExecutionAuthorizationFinalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
