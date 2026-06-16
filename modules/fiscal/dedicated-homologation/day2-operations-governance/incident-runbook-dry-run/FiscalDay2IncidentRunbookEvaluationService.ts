import { FiscalDay2IncidentRunbookInput, FiscalDay2IncidentRunbookResult } from './FiscalDay2IncidentRunbookTypes';
import { FiscalDay2IncidentRunbookPolicy } from './FiscalDay2IncidentRunbookPolicy';
import { FiscalDay2IncidentResponseSimulationPlan } from './FiscalDay2IncidentResponseSimulationPlan';
import { FiscalDay2IncidentTriageMatrix } from './FiscalDay2IncidentTriageMatrix';
import { FiscalDay2SeverityClassificationMatrix } from './FiscalDay2SeverityClassificationMatrix';
import { FiscalDay2RunbookExecutionNoOpPlan } from './FiscalDay2RunbookExecutionNoOpPlan';
import { FiscalDay2MitigationActionNoOpCatalog } from './FiscalDay2MitigationActionNoOpCatalog';
import { FiscalDay2OnCallEscalationNoNotificationPlan } from './FiscalDay2OnCallEscalationNoNotificationPlan';
import { FiscalDay2IncidentCommunicationNoSendPlan } from './FiscalDay2IncidentCommunicationNoSendPlan';
import { FiscalDay2PostIncidentReviewNoPersistencePlan } from './FiscalDay2PostIncidentReviewNoPersistencePlan';
import { FiscalDay2IncidentRunbookSafetyChecklist } from './FiscalDay2IncidentRunbookSafetyChecklist';
import { FiscalDay2IncidentRunbookDependencyMatrix } from './FiscalDay2IncidentRunbookDependencyMatrix';
import { FiscalDay2IncidentRunbookBlockerRegister } from './FiscalDay2IncidentRunbookBlockerRegister';
import { FiscalDay2IncidentRunbookRiskRegister } from './FiscalDay2IncidentRunbookRiskRegister';

export class FiscalDay2IncidentRunbookEvaluationService {
  public static evaluate(input: FiscalDay2IncidentRunbookInput): FiscalDay2IncidentRunbookResult {
    const policyResult = FiscalDay2IncidentRunbookPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalDay2IncidentRunbookResult;
    }

    FiscalDay2IncidentResponseSimulationPlan.getPlan();
    FiscalDay2IncidentTriageMatrix.getMatrix();
    FiscalDay2SeverityClassificationMatrix.getMatrix();
    FiscalDay2RunbookExecutionNoOpPlan.getPlan();
    FiscalDay2MitigationActionNoOpCatalog.getCatalog();
    FiscalDay2OnCallEscalationNoNotificationPlan.getPlan();
    FiscalDay2IncidentCommunicationNoSendPlan.getPlan();
    FiscalDay2PostIncidentReviewNoPersistencePlan.getPlan();
    FiscalDay2IncidentRunbookSafetyChecklist.getChecklist();
    FiscalDay2IncidentRunbookDependencyMatrix.getMatrix();

    const baseResult = FiscalDay2IncidentRunbookPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalDay2IncidentRunbookBlockerRegister.getBlockers(),
      warnings: FiscalDay2IncidentRunbookRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
