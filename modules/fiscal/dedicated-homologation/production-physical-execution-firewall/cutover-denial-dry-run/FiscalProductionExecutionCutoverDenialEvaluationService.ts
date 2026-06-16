import { FiscalProductionExecutionCutoverDenialInput } from './FiscalProductionExecutionCutoverDenialTypes';
import { FiscalProductionExecutionCutoverDenialValidator } from './FiscalProductionExecutionCutoverDenialValidator';
import { FiscalProductionExecutionCutoverDenialPolicy } from './FiscalProductionExecutionCutoverDenialPolicy';
import { FiscalProductionPhysicalCutoverAttemptDenialMatrix } from './FiscalProductionPhysicalCutoverAttemptDenialMatrix';
import { FiscalProductionEmergencyRuntimeContainmentNoOpPlan } from './FiscalProductionEmergencyRuntimeContainmentNoOpPlan';
import { FiscalProductionPhysicalExecutionAttemptBlockMatrix } from './FiscalProductionPhysicalExecutionAttemptBlockMatrix';
import { FiscalProductionTrafficPromotionDenialMatrix } from './FiscalProductionTrafficPromotionDenialMatrix';
import { FiscalProductionLegacyMandatoryContinuityMatrix } from './FiscalProductionLegacyMandatoryContinuityMatrix';
import { FiscalProductionCutoverAbortNoOpMatrix } from './FiscalProductionCutoverAbortNoOpMatrix';
import { FiscalProductionRollbackNoOpMatrix } from './FiscalProductionRollbackNoOpMatrix';
import { FiscalProductionNoPhysicalCutoverEvidence } from './FiscalProductionNoPhysicalCutoverEvidence';
import { FiscalProductionNoRealKillSwitchEvidence } from './FiscalProductionNoRealKillSwitchEvidence';
import { FiscalProductionCutoverDenialNoTrafficMutationEvidence } from './FiscalProductionCutoverDenialNoTrafficMutationEvidence';
import { FiscalProductionExecutionCutoverDenialDependencyMatrix } from './FiscalProductionExecutionCutoverDenialDependencyMatrix';
import { FiscalProductionExecutionCutoverDenialBlockerRegister } from './FiscalProductionExecutionCutoverDenialBlockerRegister';
import { FiscalProductionExecutionCutoverDenialRiskRegister } from './FiscalProductionExecutionCutoverDenialRiskRegister';

export class FiscalProductionExecutionCutoverDenialEvaluationService {
  public static evaluate(input: FiscalProductionExecutionCutoverDenialInput) {
    FiscalProductionExecutionCutoverDenialValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionExecutionCutoverDenialPolicy.getPolicyMessage(),
      physicalCutoverAttemptDenialMatrix: FiscalProductionPhysicalCutoverAttemptDenialMatrix.getMatrix(),
      emergencyRuntimeContainmentNoOpPlan: FiscalProductionEmergencyRuntimeContainmentNoOpPlan.getPlan(),
      physicalExecutionAttemptBlockMatrix: FiscalProductionPhysicalExecutionAttemptBlockMatrix.getMatrix(),
      trafficPromotionDenialMatrix: FiscalProductionTrafficPromotionDenialMatrix.getMatrix(),
      legacyMandatoryContinuityMatrix: FiscalProductionLegacyMandatoryContinuityMatrix.getMatrix(),
      cutoverAbortNoOpMatrix: FiscalProductionCutoverAbortNoOpMatrix.getMatrix(),
      rollbackNoOpMatrix: FiscalProductionRollbackNoOpMatrix.getMatrix(),
      noPhysicalCutoverEvidence: FiscalProductionNoPhysicalCutoverEvidence.getEvidence(),
      noRealKillSwitchEvidence: FiscalProductionNoRealKillSwitchEvidence.getEvidence(),
      noTrafficMutationEvidence: FiscalProductionCutoverDenialNoTrafficMutationEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionExecutionCutoverDenialDependencyMatrix.getMatrix(),
      blockers: FiscalProductionExecutionCutoverDenialBlockerRegister.getBlockers(),
      risks: FiscalProductionExecutionCutoverDenialRiskRegister.getRisks(),
    };
  }
}
