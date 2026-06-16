import { FiscalProductionOperationsSupportRunbookInput, FiscalProductionOperationsSupportRunbookResult } from './FiscalProductionOperationsSupportRunbookTypes';
import { FiscalProductionOperationsSupportRunbookPolicy } from './FiscalProductionOperationsSupportRunbookPolicy';
import { FiscalProductionOperationsSupportRunbookSimulationPlan } from './FiscalProductionOperationsSupportRunbookSimulationPlan';
import { FiscalProductionOperationsIncidentTriageSimulationMatrix } from './FiscalProductionOperationsIncidentTriageSimulationMatrix';
import { FiscalProductionOperationsSeverityClassificationMatrix } from './FiscalProductionOperationsSeverityClassificationMatrix';
import { FiscalProductionOperationsRunbookExecutionNoOpPlan } from './FiscalProductionOperationsRunbookExecutionNoOpPlan';
import { FiscalProductionOperationsMitigationNoOpCatalog } from './FiscalProductionOperationsMitigationNoOpCatalog';
import { FiscalProductionOperationsEscalationNoNotificationPlan } from './FiscalProductionOperationsEscalationNoNotificationPlan';
import { FiscalProductionOperationsIncidentCommunicationNoSendPlan } from './FiscalProductionOperationsIncidentCommunicationNoSendPlan';
import { FiscalProductionOperationsPostIncidentReviewNoPersistencePlan } from './FiscalProductionOperationsPostIncidentReviewNoPersistencePlan';
import { FiscalProductionOperationsNoRealIncidentEvidence } from './FiscalProductionOperationsNoRealIncidentEvidence';
import { FiscalProductionOperationsNoRealRunbookExecutionEvidence } from './FiscalProductionOperationsNoRealRunbookExecutionEvidence';
import { FiscalProductionOperationsSupportRunbookDependencyMatrix } from './FiscalProductionOperationsSupportRunbookDependencyMatrix';
import { FiscalProductionOperationsSupportRunbookBlockerRegister } from './FiscalProductionOperationsSupportRunbookBlockerRegister';
import { FiscalProductionOperationsSupportRunbookRiskRegister } from './FiscalProductionOperationsSupportRunbookRiskRegister';

export class FiscalProductionOperationsSupportRunbookEvaluationService {
  public static evaluate(input: FiscalProductionOperationsSupportRunbookInput): FiscalProductionOperationsSupportRunbookResult {
    const policyResult = FiscalProductionOperationsSupportRunbookPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionOperationsSupportRunbookResult;
    }

    FiscalProductionOperationsSupportRunbookSimulationPlan.getPlan();
    FiscalProductionOperationsIncidentTriageSimulationMatrix.getMatrix();
    FiscalProductionOperationsSeverityClassificationMatrix.getMatrix();
    FiscalProductionOperationsRunbookExecutionNoOpPlan.getPlan();
    FiscalProductionOperationsMitigationNoOpCatalog.getCatalog();
    FiscalProductionOperationsEscalationNoNotificationPlan.getPlan();
    FiscalProductionOperationsIncidentCommunicationNoSendPlan.getPlan();
    FiscalProductionOperationsPostIncidentReviewNoPersistencePlan.getPlan();
    FiscalProductionOperationsNoRealIncidentEvidence.getEvidence();
    FiscalProductionOperationsNoRealRunbookExecutionEvidence.getEvidence();
    FiscalProductionOperationsSupportRunbookDependencyMatrix.getMatrix();

    const baseResult = FiscalProductionOperationsSupportRunbookPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionOperationsSupportRunbookBlockerRegister.getBlockers(),
      warnings: FiscalProductionOperationsSupportRunbookRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
