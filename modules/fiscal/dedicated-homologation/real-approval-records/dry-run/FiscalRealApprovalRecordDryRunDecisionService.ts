import { FiscalRealApprovalRecordDryRunInput, FiscalRealApprovalRecordDryRunResult, FiscalRealApprovalRecordDryRunStatus } from './FiscalRealApprovalRecordDryRunTypes';
import { FiscalRealApprovalRecordDryRunEvaluationService } from './FiscalRealApprovalRecordDryRunEvaluationService';

export class FiscalRealApprovalRecordDryRunDecisionService {
  public static simulateDecision(input: FiscalRealApprovalRecordDryRunInput): FiscalRealApprovalRecordDryRunResult {
    const evaluation = FiscalRealApprovalRecordDryRunEvaluationService.evaluate(input);
    
    if (evaluation.success === false) return evaluation;

    return {
      ...evaluation,
      status: FiscalRealApprovalRecordDryRunStatus.AUDIT_TRAIL_SIMULATION_READY,
      approvalRecordDryRunStored: true,
      approvalRecordPersisted: false,
      approvalRecordSigned: false,
      realApprovalRecordCreated: false,
      realAuthorizationGranted: false,
      ddlExecuted: false,
      dmlExecuted: false,
      commitExecuted: false,
      approvedForDryRunPersistenceSimulation: true,
      approvedForAuditTrailSimulation: true,
      approvedForRealApprovalRecordPersistence: false,
      approvedForRealApprovalRecordSignature: false,
      approvedForRealAuthorizationGrant: false,
      approvedForRealExecutionAuthorization: false,
      approvedForProductionV2: false
    };
  }
}
