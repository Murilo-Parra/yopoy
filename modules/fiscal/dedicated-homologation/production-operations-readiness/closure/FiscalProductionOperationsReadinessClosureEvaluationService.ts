import { FiscalProductionOperationsReadinessClosureInventory } from './FiscalProductionOperationsReadinessClosureInventory';
import { FiscalProductionOperationsReadinessFinalChecklist } from './FiscalProductionOperationsReadinessFinalChecklist';
import { FiscalProductionOperationsReadinessEvidencePackageService } from './FiscalProductionOperationsReadinessEvidencePackageService';
import { FiscalProductionOperationsReadinessNoActivationHandoffService } from './FiscalProductionOperationsReadinessNoActivationHandoffService';
import { FiscalProductionOperationsReadinessPostClosureRoadmap } from './FiscalProductionOperationsReadinessPostClosureRoadmap';
import { FiscalProductionOperationsReadinessFinalBlockerRegister } from './FiscalProductionOperationsReadinessFinalBlockerRegister';
import { FiscalProductionOperationsReadinessFinalRiskRegister } from './FiscalProductionOperationsReadinessFinalRiskRegister';
import { FiscalProductionOperationsReadinessClosurePolicy } from './FiscalProductionOperationsReadinessClosurePolicy';
import { FiscalProductionOperationsReadinessClosureValidator } from './FiscalProductionOperationsReadinessClosureValidator';
import { FiscalProductionOperationsReadinessClosureInput } from './FiscalProductionOperationsReadinessClosureTypes';

export class FiscalProductionOperationsReadinessClosureEvaluationService {
  public static evaluate(input: FiscalProductionOperationsReadinessClosureInput) {
    // 1. validator
    FiscalProductionOperationsReadinessClosureValidator.validate(input);

    return {
      evaluationExecuted: true,
      policy: FiscalProductionOperationsReadinessClosurePolicy.getPolicyMessage(),
      inventory: FiscalProductionOperationsReadinessClosureInventory.getInventory(),
      checklist: FiscalProductionOperationsReadinessFinalChecklist.getChecklist(),
      package: FiscalProductionOperationsReadinessEvidencePackageService.generatePackage(),
      handoff: FiscalProductionOperationsReadinessNoActivationHandoffService.simulateHandoff(),
      roadmap: FiscalProductionOperationsReadinessPostClosureRoadmap.getRoadmap(),
      blockers: FiscalProductionOperationsReadinessFinalBlockerRegister.getBlockers(),
      risks: FiscalProductionOperationsReadinessFinalRiskRegister.getRisks()
    };
  }
}
