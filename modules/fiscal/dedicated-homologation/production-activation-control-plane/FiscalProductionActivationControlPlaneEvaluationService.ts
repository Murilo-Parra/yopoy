import { FiscalProductionActivationControlPlaneBlueprint } from './FiscalProductionActivationControlPlaneBlueprint';
import { FiscalProductionPhysicalExecutionProhibitionContract } from './FiscalProductionPhysicalExecutionProhibitionContract';
import { FiscalProductionActivationDependencyInventory } from './FiscalProductionActivationDependencyInventory';
import { FiscalProductionActivationAuthorizationNoOpMatrix } from './FiscalProductionActivationAuthorizationNoOpMatrix';
import { FiscalProductionTrafficMutationProhibitionPlan } from './FiscalProductionTrafficMutationProhibitionPlan';
import { FiscalProductionRuntimeExecutionProhibitionPlan } from './FiscalProductionRuntimeExecutionProhibitionPlan';
import { FiscalProductionDataMutationProhibitionPlan } from './FiscalProductionDataMutationProhibitionPlan';
import { FiscalProductionExternalIntegrationProhibitionPlan } from './FiscalProductionExternalIntegrationProhibitionPlan';
import { FiscalProductionActivationPreconditionMatrix } from './FiscalProductionActivationPreconditionMatrix';
import { FiscalProductionNoPhysicalExecutionEvidence } from './FiscalProductionNoPhysicalExecutionEvidence';
import { FiscalProductionActivationControlPlaneBlockerRegister } from './FiscalProductionActivationControlPlaneBlockerRegister';
import { FiscalProductionActivationControlPlaneRiskRegister } from './FiscalProductionActivationControlPlaneRiskRegister';
import { FiscalProductionActivationControlPlanePolicy } from './FiscalProductionActivationControlPlanePolicy';
import { FiscalProductionActivationControlPlaneValidator } from './FiscalProductionActivationControlPlaneValidator';
import { FiscalProductionActivationControlPlaneInput } from './FiscalProductionActivationControlPlaneTypes';

export class FiscalProductionActivationControlPlaneEvaluationService {
  public static evaluate(input: FiscalProductionActivationControlPlaneInput) {
    FiscalProductionActivationControlPlaneValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionActivationControlPlanePolicy.getPolicyMessage(),
      controlPlaneBlueprint: FiscalProductionActivationControlPlaneBlueprint.getBlueprint(),
      physicalExecutionProhibitionContract: FiscalProductionPhysicalExecutionProhibitionContract.getContract(),
      dependencyInventory: FiscalProductionActivationDependencyInventory.getInventory(),
      authorizationNoOpMatrix: FiscalProductionActivationAuthorizationNoOpMatrix.getMatrix(),
      trafficMutationProhibitionPlan: FiscalProductionTrafficMutationProhibitionPlan.getPlan(),
      runtimeExecutionProhibitionPlan: FiscalProductionRuntimeExecutionProhibitionPlan.getPlan(),
      dataMutationProhibitionPlan: FiscalProductionDataMutationProhibitionPlan.getPlan(),
      externalIntegrationProhibitionPlan: FiscalProductionExternalIntegrationProhibitionPlan.getPlan(),
      activationPreconditionMatrix: FiscalProductionActivationPreconditionMatrix.getMatrix(),
      noPhysicalExecutionEvidence: FiscalProductionNoPhysicalExecutionEvidence.getEvidence(),
      blockers: FiscalProductionActivationControlPlaneBlockerRegister.getBlockers(),
      risks: FiscalProductionActivationControlPlaneRiskRegister.getRisks()
    };
  }
}
