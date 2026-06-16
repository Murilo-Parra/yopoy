import { FiscalProductionSealHandoffDisconnectionInput, FiscalProductionSealHandoffDisconnectionResult, FiscalProductionSealHandoffDisconnectionStatus } from './FiscalProductionSealHandoffDisconnectionTypes';
import { FiscalProductionSealHandoffDisconnectionValidator } from './FiscalProductionSealHandoffDisconnectionValidator';
import { FiscalProductionSystemWideSealHandoffDisconnectionBlueprint } from './FiscalProductionSystemWideSealHandoffDisconnectionBlueprint';
import { FiscalProductionOperationalContinuationSuppressionMatrix } from './FiscalProductionOperationalContinuationSuppressionMatrix';
import { FiscalProductionAuthorityPropagationNoOpContract } from './FiscalProductionAuthorityPropagationNoOpContract';
import { FiscalProductionFinalActivationPathDisconnectionPlan } from './FiscalProductionFinalActivationPathDisconnectionPlan';
import { FiscalProductionPostSealNoExecutionBoundaryMatrix } from './FiscalProductionPostSealNoExecutionBoundaryMatrix';
import { FiscalProductionVirtualSealOutputNoHandoffPlan } from './FiscalProductionVirtualSealOutputNoHandoffPlan';
import { FiscalProductionFinalCommandChannelNoOpenMatrix } from './FiscalProductionFinalCommandChannelNoOpenMatrix';
import { FiscalProductionProductionV2PathNoCreateEvidence } from './FiscalProductionProductionV2PathNoCreateEvidence';
import { FiscalProductionNoRealHandoffEvidence } from './FiscalProductionNoRealHandoffEvidence';
import { FiscalProductionNoRealContinuationEvidence } from './FiscalProductionNoRealContinuationEvidence';
import { FiscalProductionNoRealAuthorityPropagationEvidence } from './FiscalProductionNoRealAuthorityPropagationEvidence';
import { FiscalProductionNoRealActivationPathEvidence } from './FiscalProductionNoRealActivationPathEvidence';
import { FiscalProductionSealHandoffDisconnectionDependencyMatrix } from './FiscalProductionSealHandoffDisconnectionDependencyMatrix';
import { FiscalProductionSealHandoffDisconnectionBlockerRegister } from './FiscalProductionSealHandoffDisconnectionBlockerRegister';
import { FiscalProductionSealHandoffDisconnectionRiskRegister } from './FiscalProductionSealHandoffDisconnectionRiskRegister';

export class FiscalProductionSealHandoffDisconnectionEvaluationService {
  public static evaluate(input: FiscalProductionSealHandoffDisconnectionInput): any {
    const blockers = FiscalProductionSealHandoffDisconnectionValidator.validate(input);
    
    if (blockers.length > 0) {
      return {
        status: FiscalProductionSealHandoffDisconnectionStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionSealHandoffDisconnectionStatus.PRODUCTION_SYSTEM_WIDE_SEAL_HANDOFF_DISCONNECTION_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      blueprint: FiscalProductionSystemWideSealHandoffDisconnectionBlueprint.getBlueprint(),
      continuationSuppressionMatrix: FiscalProductionOperationalContinuationSuppressionMatrix.getMatrix(),
      authorityPropagationNoOpContract: FiscalProductionAuthorityPropagationNoOpContract.getContract(),
      finalActivationPathDisconnectionPlan: FiscalProductionFinalActivationPathDisconnectionPlan.getPlan(),
      postSealNoExecutionBoundaryMatrix: FiscalProductionPostSealNoExecutionBoundaryMatrix.getMatrix(),
      virtualSealOutputNoHandoffPlan: FiscalProductionVirtualSealOutputNoHandoffPlan.getPlan(),
      finalCommandChannelNoOpenMatrix: FiscalProductionFinalCommandChannelNoOpenMatrix.getMatrix(),
      productionV2PathNoCreateEvidence: FiscalProductionProductionV2PathNoCreateEvidence.getEvidence(),
      noRealHandoffEvidence: FiscalProductionNoRealHandoffEvidence.getEvidence(),
      noRealContinuationEvidence: FiscalProductionNoRealContinuationEvidence.getEvidence(),
      noRealAuthorityPropagationEvidence: FiscalProductionNoRealAuthorityPropagationEvidence.getEvidence(),
      noRealActivationPathEvidence: FiscalProductionNoRealActivationPathEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionSealHandoffDisconnectionDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionSealHandoffDisconnectionBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionSealHandoffDisconnectionRiskRegister.getRisks()
    };
  }
}
