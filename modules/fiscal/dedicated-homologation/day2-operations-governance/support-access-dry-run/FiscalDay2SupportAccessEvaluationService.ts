import { FiscalDay2SupportAccessInput, FiscalDay2SupportAccessResult } from './FiscalDay2SupportAccessTypes';
import { FiscalDay2SupportAccessPolicy } from './FiscalDay2SupportAccessPolicy';
import { FiscalDay2SupportTeamAccessBlueprint } from './FiscalDay2SupportTeamAccessBlueprint';
import { FiscalDay2SupportResponsibilityMatrix } from './FiscalDay2SupportResponsibilityMatrix';
import { FiscalDay2SupportRbacSimulationMatrix } from './FiscalDay2SupportRbacSimulationMatrix';
import { FiscalDay2NoPrivilegeEscalationBoundary } from './FiscalDay2NoPrivilegeEscalationBoundary';
import { FiscalDay2SupportDataAccessNoReadPlan } from './FiscalDay2SupportDataAccessNoReadPlan';
import { FiscalDay2AssistedSessionNoOpPlan } from './FiscalDay2AssistedSessionNoOpPlan';
import { FiscalDay2SupportAuditNoPersistencePlan } from './FiscalDay2SupportAuditNoPersistencePlan';
import { FiscalDay2InternalEscalationNoNotificationPlan } from './FiscalDay2InternalEscalationNoNotificationPlan';
import { FiscalDay2SupportAccessSafetyChecklist } from './FiscalDay2SupportAccessSafetyChecklist';
import { FiscalDay2SupportAccessDependencyMatrix } from './FiscalDay2SupportAccessDependencyMatrix';
import { FiscalDay2SupportAccessBlockerRegister } from './FiscalDay2SupportAccessBlockerRegister';
import { FiscalDay2SupportAccessRiskRegister } from './FiscalDay2SupportAccessRiskRegister';

export class FiscalDay2SupportAccessEvaluationService {
  public static evaluate(input: FiscalDay2SupportAccessInput): FiscalDay2SupportAccessResult {
    const policyResult = FiscalDay2SupportAccessPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalDay2SupportAccessResult;
    }

    FiscalDay2SupportTeamAccessBlueprint.getBlueprint();
    FiscalDay2SupportResponsibilityMatrix.getMatrix();
    FiscalDay2SupportRbacSimulationMatrix.getMatrix();
    FiscalDay2NoPrivilegeEscalationBoundary.getBoundary();
    FiscalDay2SupportDataAccessNoReadPlan.getPlan();
    FiscalDay2AssistedSessionNoOpPlan.getPlan();
    FiscalDay2SupportAuditNoPersistencePlan.getPlan();
    FiscalDay2InternalEscalationNoNotificationPlan.getPlan();
    FiscalDay2SupportAccessSafetyChecklist.getChecklist();
    FiscalDay2SupportAccessDependencyMatrix.getMatrix();

    const baseResult = FiscalDay2SupportAccessPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalDay2SupportAccessBlockerRegister.getBlockers(),
      warnings: FiscalDay2SupportAccessRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
