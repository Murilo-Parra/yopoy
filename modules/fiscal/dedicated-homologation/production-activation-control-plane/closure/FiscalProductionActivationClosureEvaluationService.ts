import { FiscalProductionActivationClosureInventory } from './FiscalProductionActivationClosureInventory';
import { FiscalProductionActivationFinalChecklist } from './FiscalProductionActivationFinalChecklist';
import { FiscalProductionActivationEvidencePackageService } from './FiscalProductionActivationEvidencePackageService';
import { FiscalProductionActivationNoActivationHandoffService } from './FiscalProductionActivationNoActivationHandoffService';
import { FiscalProductionActivationPostClosureRoadmap } from './FiscalProductionActivationPostClosureRoadmap';
import { FiscalProductionActivationFinalBlockerRegister } from './FiscalProductionActivationFinalBlockerRegister';
import { FiscalProductionActivationFinalRiskRegister } from './FiscalProductionActivationFinalRiskRegister';
import { FiscalProductionActivationClosurePolicy } from './FiscalProductionActivationClosurePolicy';
import { FiscalProductionActivationClosureValidator } from './FiscalProductionActivationClosureValidator';
import { FiscalProductionActivationClosureInput } from './FiscalProductionActivationClosureTypes';

export class FiscalProductionActivationClosureEvaluationService {
  public static evaluate(input: FiscalProductionActivationClosureInput) {
    FiscalProductionActivationClosureValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionActivationClosurePolicy.getPolicyMessage(),
      closureInventory: FiscalProductionActivationClosureInventory.getInventory(),
      finalChecklist: FiscalProductionActivationFinalChecklist.getChecklist(),
      evidencePackage: FiscalProductionActivationEvidencePackageService.getPackage(),
      noActivationHandoff: FiscalProductionActivationNoActivationHandoffService.getHandoff(),
      postClosureRoadmap: FiscalProductionActivationPostClosureRoadmap.getRoadmap(),
      finalBlockers: FiscalProductionActivationFinalBlockerRegister.getBlockers(),
      finalRisks: FiscalProductionActivationFinalRiskRegister.getRisks()
    };
  }
}
