import { FiscalProductionPhysicalExecutionFirewallClosureInput } from './FiscalProductionPhysicalExecutionFirewallClosureTypes';
import { FiscalProductionPhysicalExecutionFirewallClosurePolicy } from './FiscalProductionPhysicalExecutionFirewallClosurePolicy';
import { FiscalProductionPhysicalExecutionFirewallClosureValidator } from './FiscalProductionPhysicalExecutionFirewallClosureValidator';
import { FiscalProductionPhysicalExecutionFirewallClosureInventory } from './FiscalProductionPhysicalExecutionFirewallClosureInventory';
import { FiscalProductionPhysicalExecutionFirewallFinalChecklist } from './FiscalProductionPhysicalExecutionFirewallFinalChecklist';
import { FiscalProductionPhysicalExecutionFirewallEvidencePackageService } from './FiscalProductionPhysicalExecutionFirewallEvidencePackageService';
import { FiscalProductionPhysicalExecutionNoActivationHandoffService } from './FiscalProductionPhysicalExecutionNoActivationHandoffService';
import { FiscalProductionPhysicalExecutionPostClosureRoadmap } from './FiscalProductionPhysicalExecutionPostClosureRoadmap';
import { FiscalProductionPhysicalExecutionFinalBlockerRegister } from './FiscalProductionPhysicalExecutionFinalBlockerRegister';
import { FiscalProductionPhysicalExecutionFinalRiskRegister } from './FiscalProductionPhysicalExecutionFinalRiskRegister';

export class FiscalProductionPhysicalExecutionFirewallClosureEvaluationService {
  public static evaluate(input: FiscalProductionPhysicalExecutionFirewallClosureInput) {
    FiscalProductionPhysicalExecutionFirewallClosureValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionPhysicalExecutionFirewallClosurePolicy.getPolicyMessage(),
      closureInventory: FiscalProductionPhysicalExecutionFirewallClosureInventory.getInventory(),
      finalChecklist: FiscalProductionPhysicalExecutionFirewallFinalChecklist.getChecklist(),
      evidencePackage: FiscalProductionPhysicalExecutionFirewallEvidencePackageService.getPackage(),
      noActivationHandoff: FiscalProductionPhysicalExecutionNoActivationHandoffService.getHandoff(),
      postClosureRoadmap: FiscalProductionPhysicalExecutionPostClosureRoadmap.getRoadmap(),
      finalBlockers: FiscalProductionPhysicalExecutionFinalBlockerRegister.getBlockers(),
      finalRisks: FiscalProductionPhysicalExecutionFinalRiskRegister.getRisks(),
    };
  }
}
