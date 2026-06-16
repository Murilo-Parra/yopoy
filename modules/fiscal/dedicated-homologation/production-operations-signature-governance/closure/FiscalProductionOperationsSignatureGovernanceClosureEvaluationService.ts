import { FiscalProductionOperationsSignatureGovernanceClosureInventory } from './FiscalProductionOperationsSignatureGovernanceClosureInventory';
import { FiscalProductionOperationsSignatureGovernanceFinalChecklist } from './FiscalProductionOperationsSignatureGovernanceFinalChecklist';
import { FiscalProductionOperationsSignatureGovernanceEvidencePackageService } from './FiscalProductionOperationsSignatureGovernanceEvidencePackageService';
import { FiscalProductionOperationsSignatureNoActivationHandoffService } from './FiscalProductionOperationsSignatureNoActivationHandoffService';
import { FiscalProductionOperationsSignaturePostClosureRoadmap } from './FiscalProductionOperationsSignaturePostClosureRoadmap';
import { FiscalProductionOperationsSignatureFinalBlockerRegister } from './FiscalProductionOperationsSignatureFinalBlockerRegister';
import { FiscalProductionOperationsSignatureFinalRiskRegister } from './FiscalProductionOperationsSignatureFinalRiskRegister';
import { FiscalProductionOperationsSignatureGovernanceClosurePolicy } from './FiscalProductionOperationsSignatureGovernanceClosurePolicy';
import { FiscalProductionOperationsSignatureGovernanceClosureValidator } from './FiscalProductionOperationsSignatureGovernanceClosureValidator';
import { FiscalProductionOperationsSignatureGovernanceClosureInput } from './FiscalProductionOperationsSignatureGovernanceClosureTypes';

export class FiscalProductionOperationsSignatureGovernanceClosureEvaluationService {
  public static evaluate(input: FiscalProductionOperationsSignatureGovernanceClosureInput) {
    FiscalProductionOperationsSignatureGovernanceClosureValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionOperationsSignatureGovernanceClosurePolicy.getPolicyMessage(),
      closureInventory: FiscalProductionOperationsSignatureGovernanceClosureInventory.getInventory(),
      finalChecklist: FiscalProductionOperationsSignatureGovernanceFinalChecklist.getChecklist(),
      evidencePackage: FiscalProductionOperationsSignatureGovernanceEvidencePackageService.getEvidencePackage(),
      noActivationHandoff: FiscalProductionOperationsSignatureNoActivationHandoffService.getHandoff(),
      postClosureRoadmap: FiscalProductionOperationsSignaturePostClosureRoadmap.getRoadmap(),
      finalBlockers: FiscalProductionOperationsSignatureFinalBlockerRegister.getBlockers(),
      finalRisks: FiscalProductionOperationsSignatureFinalRiskRegister.getRisks()
    };
  }
}
