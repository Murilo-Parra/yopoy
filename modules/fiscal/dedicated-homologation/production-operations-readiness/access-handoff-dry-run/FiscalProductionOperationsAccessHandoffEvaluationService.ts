import { FiscalProductionOperationsAccessHandoffInput, FiscalProductionOperationsAccessHandoffResult } from './FiscalProductionOperationsAccessHandoffTypes';
import { FiscalProductionOperationsAccessHandoffPolicy } from './FiscalProductionOperationsAccessHandoffPolicy';
import { FiscalProductionOperationsAccessHandoffBlueprint } from './FiscalProductionOperationsAccessHandoffBlueprint';
import { FiscalProductionOperationsResponsibilityHandoffMatrix } from './FiscalProductionOperationsResponsibilityHandoffMatrix';
import { FiscalProductionOperationsRbacSimulationMatrix } from './FiscalProductionOperationsRbacSimulationMatrix';
import { FiscalProductionOperationsNoPrivilegeEscalationBoundary } from './FiscalProductionOperationsNoPrivilegeEscalationBoundary';
import { FiscalProductionOperationsNoRealAccessGrantEvidence } from './FiscalProductionOperationsNoRealAccessGrantEvidence';
import { FiscalProductionOperationsNoPermissionMutationEvidence } from './FiscalProductionOperationsNoPermissionMutationEvidence';
import { FiscalProductionOperationsAssistedSessionNoOpPlan } from './FiscalProductionOperationsAssistedSessionNoOpPlan';
import { FiscalProductionOperationsDataAccessNoReadPlan } from './FiscalProductionOperationsDataAccessNoReadPlan';
import { FiscalProductionOperationsAccessAuditNoPersistencePlan } from './FiscalProductionOperationsAccessAuditNoPersistencePlan';
import { FiscalProductionOperationsAccessHandoffDependencyMatrix } from './FiscalProductionOperationsAccessHandoffDependencyMatrix';
import { FiscalProductionOperationsAccessHandoffBlockerRegister } from './FiscalProductionOperationsAccessHandoffBlockerRegister';
import { FiscalProductionOperationsAccessHandoffRiskRegister } from './FiscalProductionOperationsAccessHandoffRiskRegister';

export class FiscalProductionOperationsAccessHandoffEvaluationService {
  public static evaluate(input: FiscalProductionOperationsAccessHandoffInput): FiscalProductionOperationsAccessHandoffResult {
    const policyResult = FiscalProductionOperationsAccessHandoffPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsAccessHandoffResult;
    }

    FiscalProductionOperationsAccessHandoffBlueprint.getBlueprint();
    FiscalProductionOperationsResponsibilityHandoffMatrix.getMatrix();
    FiscalProductionOperationsRbacSimulationMatrix.getMatrix();
    FiscalProductionOperationsNoPrivilegeEscalationBoundary.getBoundary();
    FiscalProductionOperationsNoRealAccessGrantEvidence.getEvidence();
    FiscalProductionOperationsNoPermissionMutationEvidence.getEvidence();
    FiscalProductionOperationsAssistedSessionNoOpPlan.getPlan();
    FiscalProductionOperationsDataAccessNoReadPlan.getPlan();
    FiscalProductionOperationsAccessAuditNoPersistencePlan.getPlan();
    FiscalProductionOperationsAccessHandoffDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionOperationsAccessHandoffPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsAccessHandoffBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsAccessHandoffRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
