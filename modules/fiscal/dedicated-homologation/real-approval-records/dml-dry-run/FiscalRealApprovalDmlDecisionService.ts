import { FiscalRealApprovalDmlEvaluationService } from './FiscalRealApprovalDmlEvaluationService';

export class FiscalRealApprovalDmlDecisionService {
  public static simulateDecision(input: any) {
    const evaluation = FiscalRealApprovalDmlEvaluationService.evaluate(input);
    if (!evaluation.success) return evaluation;

    return {
      ...evaluation,
      decisionSimulated: true,
      go: false,
      noGo: true,
      realDataSeeded: false,
      dmlExecuted: false,
      insertExecuted: false,
      updateExecuted: false,
      deleteExecuted: false,
      commitExecuted: false,
      realDatabaseConnected: false,
      approvalRecordPersisted: false,
      realAuthorizationGranted: false,
      approvedForDmlSeedDryRunClosure: true,
      approvedForControlledDataMutationSimulation: true,
      approvedForRealDmlExecution: false,
      approvedForRealInsert: false,
      approvedForRealUpdate: false,
      approvedForRealDelete: false,
      approvedForRealCommit: false,
      approvedForRealApprovalRecordPersistence: false,
      approvedForRealAuthorizationGrant: false,
      approvedForProductionV2: false
    };
  }
}
