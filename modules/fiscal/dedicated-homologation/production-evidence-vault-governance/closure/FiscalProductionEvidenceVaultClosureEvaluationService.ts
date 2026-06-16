import { FiscalProductionEvidenceVaultClosureInput } from './FiscalProductionEvidenceVaultClosureTypes';
import { FiscalProductionEvidenceVaultClosurePolicy } from './FiscalProductionEvidenceVaultClosurePolicy';
import { FiscalProductionEvidenceVaultClosureValidator } from './FiscalProductionEvidenceVaultClosureValidator';
import { FiscalProductionEvidenceVaultClosureInventory } from './FiscalProductionEvidenceVaultClosureInventory';
import { FiscalProductionEvidenceVaultFinalChecklist } from './FiscalProductionEvidenceVaultFinalChecklist';
import { FiscalProductionEvidenceVaultEvidencePackageService } from './FiscalProductionEvidenceVaultEvidencePackageService';
import { FiscalProductionEvidenceNoPersistenceHandoffService } from './FiscalProductionEvidenceNoPersistenceHandoffService';
import { FiscalProductionEvidencePostClosureRoadmap } from './FiscalProductionEvidencePostClosureRoadmap';
import { FiscalProductionEvidenceVaultFinalBlockerRegister } from './FiscalProductionEvidenceVaultFinalBlockerRegister';
import { FiscalProductionEvidenceVaultFinalRiskRegister } from './FiscalProductionEvidenceVaultFinalRiskRegister';

export class FiscalProductionEvidenceVaultClosureEvaluationService {
  public static evaluate(input: FiscalProductionEvidenceVaultClosureInput) {
    FiscalProductionEvidenceVaultClosureValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionEvidenceVaultClosurePolicy.getPolicyMessage(),
      closureInventory: FiscalProductionEvidenceVaultClosureInventory.getInventory(),
      finalChecklist: FiscalProductionEvidenceVaultFinalChecklist.getChecklist(),
      evidencePackage: FiscalProductionEvidenceVaultEvidencePackageService.getPackage(),
      noPersistenceHandoff: FiscalProductionEvidenceNoPersistenceHandoffService.getHandoff(),
      postClosureRoadmap: FiscalProductionEvidencePostClosureRoadmap.getRoadmap(),
      finalBlockers: FiscalProductionEvidenceVaultFinalBlockerRegister.getBlockers(),
      finalRisks: FiscalProductionEvidenceVaultFinalRiskRegister.getRisks()
    };
  }
}
