import { FiscalDay2OperationsInput, FiscalDay2OperationsResult } from './FiscalDay2OperationsTypes';
import { FiscalDay2OperationsPolicy } from './FiscalDay2OperationsPolicy';
import { FiscalDay2OperationsGovernanceBlueprint } from './FiscalDay2OperationsGovernanceBlueprint';
import { FiscalDay2NoActivationOperationalReadinessContract } from './FiscalDay2NoActivationOperationalReadinessContract';
import { FiscalDay2SupportRunbookReadinessPlan } from './FiscalDay2SupportRunbookReadinessPlan';
import { FiscalDay2IncidentManagementReadinessPlan } from './FiscalDay2IncidentManagementReadinessPlan';
import { FiscalDay2OperationalMonitoringNoOpPlan } from './FiscalDay2OperationalMonitoringNoOpPlan';
import { FiscalDay2AlertingNoOpPlan } from './FiscalDay2AlertingNoOpPlan';
import { FiscalDay2EscalationNoNotificationMatrix } from './FiscalDay2EscalationNoNotificationMatrix';
import { FiscalDay2ChangeControlReadinessMatrix } from './FiscalDay2ChangeControlReadinessMatrix';
import { FiscalDay2RollbackEscalationMatrix } from './FiscalDay2RollbackEscalationMatrix';
import { FiscalDay2ServiceContinuityNoOpPlan } from './FiscalDay2ServiceContinuityNoOpPlan';
import { FiscalDay2OperationsDependencyMatrix } from './FiscalDay2OperationsDependencyMatrix';
import { FiscalDay2OperationsBlockerRegister } from './FiscalDay2OperationsBlockerRegister';
import { FiscalDay2OperationsRiskRegister } from './FiscalDay2OperationsRiskRegister';

export class FiscalDay2OperationsEvaluationService {
  public static evaluate(input: FiscalDay2OperationsInput): FiscalDay2OperationsResult {
    const policyResult = FiscalDay2OperationsPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalDay2OperationsResult;
    }

    FiscalDay2OperationsGovernanceBlueprint.getBlueprint();
    FiscalDay2NoActivationOperationalReadinessContract.getContract();
    FiscalDay2SupportRunbookReadinessPlan.getPlan();
    FiscalDay2IncidentManagementReadinessPlan.getPlan();
    FiscalDay2OperationalMonitoringNoOpPlan.getPlan();
    FiscalDay2AlertingNoOpPlan.getPlan();
    FiscalDay2EscalationNoNotificationMatrix.getMatrix();
    FiscalDay2ChangeControlReadinessMatrix.getMatrix();
    FiscalDay2RollbackEscalationMatrix.getMatrix();
    FiscalDay2ServiceContinuityNoOpPlan.getPlan();
    FiscalDay2OperationsDependencyMatrix.getMatrix();

    const baseResult = FiscalDay2OperationsPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalDay2OperationsBlockerRegister.getBlockers(),
      warnings: FiscalDay2OperationsRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
