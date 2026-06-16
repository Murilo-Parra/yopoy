import { FiscalRealProvisioningClosureInventory } from './FiscalRealProvisioningClosureInventory';
import { FiscalRealProvisioningFinalChecklist } from './FiscalRealProvisioningFinalChecklist';

export class FiscalRealProvisioningEvidencePackageService {
  public static getEvidence() {
    return {
      inventory: FiscalRealProvisioningClosureInventory.getInventory(),
      finalChecklist: FiscalRealProvisioningFinalChecklist.getChecklist(),
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realExecutionAuthorized: false,
      realExecutionStarted: false,
      infrastructureProvisioned: false,
      approvedForRealProvisioningClosure: true,
      approvedForRealExecutionAuthorization: false,
      governanceOnly: true,
      readOnly: true
    };
  }
}
