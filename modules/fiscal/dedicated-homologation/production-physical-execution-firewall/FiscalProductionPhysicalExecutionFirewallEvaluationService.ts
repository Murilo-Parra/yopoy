import { FiscalProductionPhysicalExecutionFirewallInput } from './FiscalProductionPhysicalExecutionFirewallTypes';
import { FiscalProductionPhysicalExecutionFirewallValidator } from './FiscalProductionPhysicalExecutionFirewallValidator';
import { FiscalProductionPhysicalExecutionFirewallPolicy } from './FiscalProductionPhysicalExecutionFirewallPolicy';
import { FiscalProductionPhysicalExecutionFirewallBlueprint } from './FiscalProductionPhysicalExecutionFirewallBlueprint';
import { FiscalProductionRuntimeInterlockNoOpContract } from './FiscalProductionRuntimeInterlockNoOpContract';
import { FiscalProductionExecutionFirewallDependencyInventory } from './FiscalProductionExecutionFirewallDependencyInventory';
import { FiscalProductionPhysicalExecutionBlockMatrix } from './FiscalProductionPhysicalExecutionBlockMatrix';
import { FiscalProductionRuntimeInterlockMatrix } from './FiscalProductionRuntimeInterlockMatrix';
import { FiscalProductionDatabaseTransactionInterlockMatrix } from './FiscalProductionDatabaseTransactionInterlockMatrix';
import { FiscalProductionExternalIntegrationInterlockMatrix } from './FiscalProductionExternalIntegrationInterlockMatrix';
import { FiscalProductionTrafficRouteInterlockMatrix } from './FiscalProductionTrafficRouteInterlockMatrix';
import { FiscalProductionAuthorizationGateInterlockMatrix } from './FiscalProductionAuthorizationGateInterlockMatrix';
import { FiscalProductionNoPhysicalRuntimeEvidence } from './FiscalProductionNoPhysicalRuntimeEvidence';
import { FiscalProductionPhysicalExecutionFirewallBlockerRegister } from './FiscalProductionPhysicalExecutionFirewallBlockerRegister';
import { FiscalProductionPhysicalExecutionFirewallRiskRegister } from './FiscalProductionPhysicalExecutionFirewallRiskRegister';

export class FiscalProductionPhysicalExecutionFirewallEvaluationService {
  public static evaluate(input: FiscalProductionPhysicalExecutionFirewallInput) {
    FiscalProductionPhysicalExecutionFirewallValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionPhysicalExecutionFirewallPolicy.getPolicyMessage(),
      firewallBlueprint: FiscalProductionPhysicalExecutionFirewallBlueprint.getBlueprint(),
      runtimeInterlockContract: FiscalProductionRuntimeInterlockNoOpContract.getContract(),
      dependencyInventory: FiscalProductionExecutionFirewallDependencyInventory.getInventory(),
      physicalExecutionBlockMatrix: FiscalProductionPhysicalExecutionBlockMatrix.getMatrix(),
      runtimeInterlockMatrix: FiscalProductionRuntimeInterlockMatrix.getMatrix(),
      databaseTransactionInterlockMatrix: FiscalProductionDatabaseTransactionInterlockMatrix.getMatrix(),
      externalIntegrationInterlockMatrix: FiscalProductionExternalIntegrationInterlockMatrix.getMatrix(),
      trafficRouteInterlockMatrix: FiscalProductionTrafficRouteInterlockMatrix.getMatrix(),
      authorizationGateInterlockMatrix: FiscalProductionAuthorizationGateInterlockMatrix.getMatrix(),
      noPhysicalRuntimeEvidence: FiscalProductionNoPhysicalRuntimeEvidence.getEvidence(),
      blockers: FiscalProductionPhysicalExecutionFirewallBlockerRegister.getBlockers(),
      risks: FiscalProductionPhysicalExecutionFirewallRiskRegister.getRisks(),
    };
  }
}
