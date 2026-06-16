import { FiscalProductionExecutionBoundaryInput, FiscalProductionExecutionBoundaryResult } from './FiscalProductionExecutionBoundaryTypes';
import { FiscalProductionExecutionBoundaryPolicy } from './FiscalProductionExecutionBoundaryPolicy';
import { FiscalProductionExecutionBoundaryBlueprint } from './FiscalProductionExecutionBoundaryBlueprint';
import { FiscalProductionNoOpActivationGate } from './FiscalProductionNoOpActivationGate';
import { FiscalProductionExecutionAuthorizationContract } from './FiscalProductionExecutionAuthorizationContract';
import { FiscalProductionExecutionEligibilityMatrix } from './FiscalProductionExecutionEligibilityMatrix';
import { FiscalProductionExecutionDependencyInventory } from './FiscalProductionExecutionDependencyInventory';
import { FiscalProductionExecutionPrerequisiteChecklist } from './FiscalProductionExecutionPrerequisiteChecklist';
import { FiscalProductionExecutionNoSideEffectEvidence } from './FiscalProductionExecutionNoSideEffectEvidence';
import { FiscalProductionExecutionBoundaryBlockerRegister } from './FiscalProductionExecutionBoundaryBlockerRegister';
import { FiscalProductionExecutionBoundaryRiskRegister } from './FiscalProductionExecutionBoundaryRiskRegister';

export class FiscalProductionExecutionBoundaryEvaluationService {
  public static evaluate(input: FiscalProductionExecutionBoundaryInput): FiscalProductionExecutionBoundaryResult {
    const policyResult = FiscalProductionExecutionBoundaryPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionExecutionBoundaryResult;
    }

    FiscalProductionExecutionBoundaryBlueprint.generateBlueprint();
    FiscalProductionNoOpActivationGate.generateGate();
    FiscalProductionExecutionAuthorizationContract.generateContract();
    FiscalProductionExecutionEligibilityMatrix.generateMatrix();
    FiscalProductionExecutionDependencyInventory.generateInventory();
    FiscalProductionExecutionPrerequisiteChecklist.generateChecklist();
    FiscalProductionExecutionNoSideEffectEvidence.generateEvidence();

    const baseResult = FiscalProductionExecutionBoundaryPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionExecutionBoundaryBlockerRegister.getBlockers(),
      warnings: FiscalProductionExecutionBoundaryRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
