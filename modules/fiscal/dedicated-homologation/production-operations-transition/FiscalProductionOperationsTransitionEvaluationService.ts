import { FiscalProductionOperationsTransitionInput, FiscalProductionOperationsTransitionResult } from './FiscalProductionOperationsTransitionTypes';
import { FiscalProductionOperationsTransitionPolicy } from './FiscalProductionOperationsTransitionPolicy';
import { FiscalProductionOperationsTransitionControlPlaneBlueprint } from './FiscalProductionOperationsTransitionControlPlaneBlueprint';
import { FiscalProductionExplicitActivationConsentBoundary } from './FiscalProductionExplicitActivationConsentBoundary';
import { FiscalProductionRealActivationReadinessNonExecutablePlan } from './FiscalProductionRealActivationReadinessNonExecutablePlan';
import { FiscalProductionTransitionAuthorityMatrix } from './FiscalProductionTransitionAuthorityMatrix';
import { FiscalProductionTwoPersonRuleNoOpPlan } from './FiscalProductionTwoPersonRuleNoOpPlan';
import { FiscalProductionActivationSeparationOfDutiesMatrix } from './FiscalProductionActivationSeparationOfDutiesMatrix';
import { FiscalProductionTransitionPreconditionChecklist } from './FiscalProductionTransitionPreconditionChecklist';
import { FiscalProductionTransitionNoExecutionEvidence } from './FiscalProductionTransitionNoExecutionEvidence';
import { FiscalProductionOperationsTransitionDependencyMatrix } from './FiscalProductionOperationsTransitionDependencyMatrix';
import { FiscalProductionOperationsTransitionBlockerRegister } from './FiscalProductionOperationsTransitionBlockerRegister';
import { FiscalProductionOperationsTransitionRiskRegister } from './FiscalProductionOperationsTransitionRiskRegister';

export class FiscalProductionOperationsTransitionEvaluationService {
  public static evaluate(input: FiscalProductionOperationsTransitionInput): FiscalProductionOperationsTransitionResult {
    const policyResult = FiscalProductionOperationsTransitionPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsTransitionResult;
    }

    FiscalProductionOperationsTransitionControlPlaneBlueprint.getBlueprint();
    FiscalProductionExplicitActivationConsentBoundary.getBoundary();
    FiscalProductionRealActivationReadinessNonExecutablePlan.getPlan();
    FiscalProductionTransitionAuthorityMatrix.getMatrix();
    FiscalProductionTwoPersonRuleNoOpPlan.getPlan();
    FiscalProductionActivationSeparationOfDutiesMatrix.getMatrix();
    FiscalProductionTransitionPreconditionChecklist.getChecklist();
    FiscalProductionTransitionNoExecutionEvidence.getEvidence();
    FiscalProductionOperationsTransitionDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionOperationsTransitionPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsTransitionBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsTransitionRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
