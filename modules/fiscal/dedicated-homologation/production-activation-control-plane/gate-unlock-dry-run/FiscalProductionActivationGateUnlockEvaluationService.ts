import { FiscalProductionActivationGateUnlockSimulation } from './FiscalProductionActivationGateUnlockSimulation';
import { FiscalProductionAuthorizationTokenNoIssuePlan } from './FiscalProductionAuthorizationTokenNoIssuePlan';
import { FiscalProductionAuthorizationGrantNoOpPlan } from './FiscalProductionAuthorizationGrantNoOpPlan';
import { FiscalProductionGateUnlockSequenceNoOpMatrix } from './FiscalProductionGateUnlockSequenceNoOpMatrix';
import { FiscalProductionV2ActivationBlockMatrix } from './FiscalProductionV2ActivationBlockMatrix';
import { FiscalProductionLegacyContinuityDuringActivationPlan } from './FiscalProductionLegacyContinuityDuringActivationPlan';
import { FiscalProductionTrafficMutationNoOpMatrix } from './FiscalProductionTrafficMutationNoOpMatrix';
import { FiscalProductionRuntimeActivationNoOpPlan } from './FiscalProductionRuntimeActivationNoOpPlan';
import { FiscalProductionDataActivationNoOpPlan } from './FiscalProductionDataActivationNoOpPlan';
import { FiscalProductionExternalIntegrationNoOpPlan } from './FiscalProductionExternalIntegrationNoOpPlan';
import { FiscalProductionGateUnlockNoRealExecutionEvidence } from './FiscalProductionGateUnlockNoRealExecutionEvidence';
import { FiscalProductionActivationGateUnlockDependencyMatrix } from './FiscalProductionActivationGateUnlockDependencyMatrix';
import { FiscalProductionActivationGateUnlockBlockerRegister } from './FiscalProductionActivationGateUnlockBlockerRegister';
import { FiscalProductionActivationGateUnlockRiskRegister } from './FiscalProductionActivationGateUnlockRiskRegister';
import { FiscalProductionActivationGateUnlockPolicy } from './FiscalProductionActivationGateUnlockPolicy';
import { FiscalProductionActivationGateUnlockValidator } from './FiscalProductionActivationGateUnlockValidator';
import { FiscalProductionActivationGateUnlockInput } from './FiscalProductionActivationGateUnlockTypes';

export class FiscalProductionActivationGateUnlockEvaluationService {
  public static evaluate(input: FiscalProductionActivationGateUnlockInput) {
    FiscalProductionActivationGateUnlockValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionActivationGateUnlockPolicy.getPolicyMessage(),
      gateUnlockSimulation: FiscalProductionActivationGateUnlockSimulation.simulate(),
      authorizationTokenNoIssuePlan: FiscalProductionAuthorizationTokenNoIssuePlan.getPlan(),
      authorizationGrantNoOpPlan: FiscalProductionAuthorizationGrantNoOpPlan.getPlan(),
      gateUnlockSequenceNoOpMatrix: FiscalProductionGateUnlockSequenceNoOpMatrix.getMatrix(),
      v2ActivationBlockMatrix: FiscalProductionV2ActivationBlockMatrix.getMatrix(),
      legacyContinuityDuringActivationPlan: FiscalProductionLegacyContinuityDuringActivationPlan.getPlan(),
      trafficMutationNoOpMatrix: FiscalProductionTrafficMutationNoOpMatrix.getMatrix(),
      runtimeActivationNoOpPlan: FiscalProductionRuntimeActivationNoOpPlan.getPlan(),
      dataActivationNoOpPlan: FiscalProductionDataActivationNoOpPlan.getPlan(),
      externalIntegrationNoOpPlan: FiscalProductionExternalIntegrationNoOpPlan.getPlan(),
      gateUnlockNoRealExecutionEvidence: FiscalProductionGateUnlockNoRealExecutionEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionActivationGateUnlockDependencyMatrix.getMatrix(),
      blockers: FiscalProductionActivationGateUnlockBlockerRegister.getBlockers(),
      risks: FiscalProductionActivationGateUnlockRiskRegister.getRisks()
    };
  }
}
